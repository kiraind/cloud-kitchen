import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getCookActivityStatusSQL    = fs.readFileSync('sql/getCookActivityStatus.sql', 'utf-8')
const getCourierActivityStatusSQL = fs.readFileSync('sql/getCourierActivityStatus.sql', 'utf-8')

export default async function getActivityStatus(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const cookId    = context.user.cook
    const courierId = context.user.courier

    if(cookId === null && courierId === null) {
        throw new AuthenticationError('Нет прав сотрудника')
    }

    const [[ activityRow ]] = (cookId !== null)
        ? await mysqlConnection.execute( getCookActivityStatusSQL,    [ cookId    ] )
        : await mysqlConnection.execute( getCourierActivityStatusSQL, [ courierId ] )

    return activityRow.Active === 1
}