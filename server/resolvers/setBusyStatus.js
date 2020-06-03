import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const setBusyStatusSQL = fs.readFileSync('sql/setBusyStatus.sql', 'utf-8')

export default async function setBusyStatus(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const courierId = context.user.courier

    if(courierId === null) {
        throw new AuthenticationError('Нет прав курьера')
    }

    const {
        status
    } = args

    await mysqlConnection.execute(
        setBusyStatusSQL,
        [ status, courierId ]
    )

    return status
}