import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getCookTasksSQL = fs.readFileSync('sql/getCookTasks.sql', 'utf-8')

export default async function getCookTasks(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const cookId = context.user.cook

    if(cookId === null) {
        throw new AuthenticationError('Нет прав работника ресторана')
    }

    const [ tasksRows ] = await mysqlConnection.execute(
        getCookTasksSQL,
        [ cookId ]
    )

    return tasksRows.map(row => ({
        orderId: row.OrderId,
        itemId:  row.MenuItemId,
        status:  row.Status === 'New' ? 'NEW'
                    : row.Status === 'InProgress' ? 'IN_PROGRESS'
                    : 'READY',
        amount:  row.Amount,

        orderShownId: row.OrderShownId,
        mealTitle:    row.MealTitle,
    }))
}