import fs from 'fs'
import bcrypt from 'bcrypt'

import apollo from 'apollo-server-express'
const { UserInputError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'
import formatName from '../../lib/ulits/formatName.js'
import validateEmail from '../../lib/ulits/validateEmail.js'
import randomBase64 from '../../lib/ulits/randomBase64.js'

const credentialsCheckSQL = fs.readFileSync('sql/credentialsCheck.sql', 'utf-8')
const addUserSQL          = fs.readFileSync('sql/addUser.sql', 'utf-8')
const addTokenSQL         = fs.readFileSync('sql/addToken.sql', 'utf-8')

const monthInMs = 30 * 24 * 60 * 60 * 1000

export default async function registerUser(_parent, args, context) {
    if(context.user) {
        return {
            name:  context.user.name,
            email: context.user.email,
        }
    }

    const {
        name,
        email,
        password
    } = args.user

    // проверяем валидность и исправляем формат имени
    const formattedName = formatName(name)
    if(!formattedName) {
        throw new UserInputError('Некорректное имя')
    }
    if(formattedName.length > 64) {
        throw new UserInputError('Слишком длинное имя')
    }

    // проверяем валидность email
    if(!validateEmail(email)) {
        throw new UserInputError('Некорректный email')
    }
    if(email.length > 64) {
        throw new UserInputError('Слишком длинный email')
    }

    // проверяем существование пользователя с таким email
    const [[ credentialsRow ]] = await mysqlConnection.execute(
        credentialsCheckSQL,
        [ email ]
    )

    if(credentialsRow) {
        throw new UserInputError('Пользователь с таким email уже зарегистрирован')
    }

    const bcryptPassword = await bcrypt.hash(password, 12)

    const [ newUserResult ] = await mysqlConnection.execute(
        addUserSQL,
        [ name, email, bcryptPassword ]
    )

    const id = newUserResult.insertId

    // выдаем токены

    const token     = randomBase64(64)
    const csrfToken = randomBase64(64)

    await mysqlConnection.execute(
        addTokenSQL,
        [ id, token, csrfToken ]
    )

    context.res.cookie(
        'token',
        token, 
        {
            // 6 месяцев с текущего момента
            expires: new Date( (new Date()).valueOf() + 6 * monthInMs ),
            httpOnly: true,
        }
    )

    context.res.cookie(
        'csrfToken',
        csrfToken, 
        {
            // 6 месяцев с текущего момента
            expires: new Date( (new Date()).valueOf() + 6 * monthInMs ),
            httpOnly: false,
        }
    )

    return 'CUSTOMER'
}