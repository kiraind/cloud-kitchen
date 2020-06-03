import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getOrdersSQL     = fs.readFileSync('sql/getOrders.sql', 'utf-8')
const getOrderItemsSQL = fs.readFileSync('sql/getOrderItems.sql', 'utf-8')

export default async function getHistory(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const [ getOrdersRows ] = await mysqlConnection.execute(
        getOrdersSQL,
        [ customerId ]
    )

    const orders = getOrdersRows.map(
        order => ({
            id:      order.Id,
            shownId: order.ShownId,
            comment: order.Comment,

            status:  !order.Ready ? 'COOKING' : !order.Delivered ? 'DELIVERING' : 'DONE',

            address: {
                id:       order.AddressId,
                street:   order.AddressStreet,
                building: order.AddressBuilding,
                room:     order.AddressRoom,
            },
            
            items:   [],
        })
    )

    for(let i = 0; i < orders.length; i += 1) {
        const order = orders[i]

        const [ getItemsRows ] = await mysqlConnection.execute(
            getOrderItemsSQL,
            [ order.id ]
        )

        getItemsRows.forEach(
            itemRow => order.items.push({
                item: {
                    id:       itemRow.MenuItemId,
                    title:    itemRow.Title,
                    price:    parseFloat(itemRow.Price) * 100, // рубли в копейки
                    calories: itemRow.Calories,
                },
                amount:       itemRow.Amount,
            })
        )
    }

    return orders
}