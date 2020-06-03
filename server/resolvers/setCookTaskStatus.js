import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const setCookTaskStatusSQL = fs.readFileSync('sql/setCookTaskStatus.sql', 'utf-8')

export default async function setCookTaskStatus(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const cookId = context.user.cook

    if(cookId === null) {
        throw new AuthenticationError('Нет прав работника ресторана')
    }

    const {
        orderId,
        itemId,
        status,
    } = args

    const dbStatus = status === 'IN_PROGRESS' ? 'InProgress' : 'Ready'

    await mysqlConnection.execute(
        setCookTaskStatusSQL,
        [ dbStatus, orderId, itemId ]
    )

    return dbStatus === 'InProgress' ? 'IN_PROGRESS' : 'READY'
}