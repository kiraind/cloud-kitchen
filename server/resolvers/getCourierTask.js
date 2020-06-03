import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getCourierTaskSQL = fs.readFileSync('sql/getCourierTask.sql', 'utf-8')

export default async function getCourierTask(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const courierId = context.user.courier

    if(courierId === null) {
        throw new AuthenticationError('Нет прав курьера')
    }

    const [ tasksRows ] = await mysqlConnection.execute(
        getCourierTaskSQL,
        [ courierId ]
    )

    if(!tasksRows[0]) {
        return null
    }

    return {
        orderId:      tasksRows[0].OrderId,
        orderShownId: tasksRows[0].ShownId,
        address: {
            id:       tasksRows[0].AddressId,
            street:   tasksRows[0].Street,
            building: tasksRows[0].Building,
            room:     tasksRows[0].Room,
        },
    }
}