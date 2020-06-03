import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getBusyStatusSQL = fs.readFileSync('sql/getBusyStatus.sql', 'utf-8')

export default async function getBusyStatus(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const courierId = context.user.courier

    if(courierId === null) {
        throw new AuthenticationError('Нет прав курьера')
    }

    const [[ busyRow ]] = await mysqlConnection.execute(
        getBusyStatusSQL,
        [ courierId ]
    )

    return busyRow.Busy === 1
}