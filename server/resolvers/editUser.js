import fs from 'fs'
import bcrypt from 'bcrypt'

import apollo from 'apollo-server-express'
const { UserInputError, AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

import formatName from '../../lib/ulits/formatName.js'
import validateEmail from '../../lib/ulits/validateEmail.js'

const credentialsCheckSQL       = fs.readFileSync('sql/credentialsCheck.sql', 'utf-8')
const editUserNameSQL           = fs.readFileSync('sql/editUserName.sql', 'utf-8')
const editUserEmailSQL          = fs.readFileSync('sql/editUserEmail.sql', 'utf-8')
const editUserBcryptPasswordSQL = fs.readFileSync('sql/editUserBcryptPassword.sql', 'utf-8')

export default async function editUser(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const {
        name,
        email,
        password
    } = args.user

    if(name) {
        // проверяем валидность и исправляем формат имени
        const formattedName = formatName(name)
        if(!formattedName) {
            throw new UserInputError('Некорректное имя')
        }
        if(formattedName.length > 64) {
            throw new UserInputError('Слишком длинное имя')
        }

        await mysqlConnection.execute(
            editUserNameSQL,
            [
                formattedName,
                context.user.id
            ]
        )

        context.user.name = formattedName
    }

    if(email) {
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

        await mysqlConnection.execute(
            editUserEmailSQL,
            [
                email,
                context.user.id
            ]
        )

        context.user.email = email
    }

    if(password) {
        const bcryptPassword = await bcrypt.hash(password, 12)

        await mysqlConnection.execute(
            editUserBcryptPasswordSQL,
            [
                bcryptPassword,
                context.user.id
            ]
        )
    }

    return {
        name:  context.user.name,
        email: context.user.email
    }
}