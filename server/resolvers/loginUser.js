import fs from 'fs'
import bcrypt from 'bcrypt'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'
import randomBase64 from '../../lib/ulits/randomBase64.js'

const credentialsCheckSQL = fs.readFileSync('sql/credentialsCheck.sql', 'utf-8')
const addTokenSQL         = fs.readFileSync('sql/addToken.sql', 'utf-8')
const internalUserSQL     = fs.readFileSync('sql/internalUser.sql', 'utf-8')

const monthInMs = 30 * 24 * 60 * 60 * 1000

export default async function loginUser(_parent, args, context) {
    if(context.user) {
        return {
            name:  context.user.name,
            email: context.user.email,
        }
    }

    const {
        email,
        password
    } = args.credentials

    const [[ row ]] = await mysqlConnection.execute(
        credentialsCheckSQL,
        [ email ]
    )

    if(!row) {
        // не зарегистрирован
        throw new AuthenticationError('Неверный email или пароль')
    }

    const bcryptPassword = row.BcryptPassword

    const match = await bcrypt.compare(password, bcryptPassword)

    if(!match) {
        // неверный пароль
        throw new AuthenticationError('Неверный email или пароль')
    }

    // выдаем токены

    const token     = randomBase64(64)
    const csrfToken = randomBase64(64)

    await mysqlConnection.execute(
        addTokenSQL,
        [ row.Id, token, csrfToken ]
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

    const [[ internalUserRow ]] = await mysqlConnection.execute(
        internalUserSQL,
        [ token, csrfToken ]
    )

    return (internalUserRow.Customer !== null)
                ? 'CUSTOMER'
                : (internalUserRow.Cook !== null)
                    ? 'COOK'
                    : 'COURIER'

}