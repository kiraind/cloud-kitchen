import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const finishCourierTaskSQL = fs.readFileSync('sql/finishCourierTask.sql', 'utf-8')

export default async function finishCourierTask(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const courierId = context.user.courier

    if(courierId === null) {
        throw new AuthenticationError('Нет прав курьера')
    }

    const {
        orderId
    } = args

    await mysqlConnection.execute(
        finishCourierTaskSQL,
        [ orderId, courierId ]
    )

    return orderId
}