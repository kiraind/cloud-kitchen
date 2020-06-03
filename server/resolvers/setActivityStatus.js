import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const setCookActivityStatusSQL    = fs.readFileSync('sql/setCookActivityStatus.sql', 'utf-8')
const setCourierActivityStatusSQL = fs.readFileSync('sql/setCourierActivityStatus.sql', 'utf-8')

export default async function setActivityStatus(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const cookId    = context.user.cook
    const courierId = context.user.courier

    if(cookId === null && courierId === null) {
        throw new AuthenticationError('Нет прав сотрудника')
    }

    const {
        status
    } = args

    if(cookId !== null) {
        await mysqlConnection.execute( setCookActivityStatusSQL,    [ status, cookId    ] )
    } else {
        await mysqlConnection.execute( setCourierActivityStatusSQL, [ status, courierId ] )
    }

    return status
}