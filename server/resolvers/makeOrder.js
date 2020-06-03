import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError, UserInputError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const maxShownIdSQL     = fs.readFileSync('sql/maxShownId.sql', 'utf-8')
const addOrderSQL       = fs.readFileSync('sql/addOrder.sql', 'utf-8')
const getActiveCooksSQL = fs.readFileSync('sql/getActiveCooks.sql', 'utf-8')
const addItemToOrderSQL = fs.readFileSync('sql/addItemToOrder.sql', 'utf-8')

export default async function makeOrder(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const {
        addressId,
        comment,
        items,
    } = args.order

    // начало транзакции
    await mysqlConnection.beginTransaction()

    // определение подходящего номера для отображения
    const [[ maxShownIdRes ]] = await mysqlConnection.execute(maxShownIdSQL)
    const maxShownId = maxShownIdRes.MaxShownId
    const shownId = maxShownId === null
        ? 1
        : maxShownId === 99
            ? 1
            : maxShownId + 1

    // создание записи заказа
    const [ newOrderResult ] = await mysqlConnection.execute(
        addOrderSQL,
        [ shownId, customerId, addressId, comment ]
    )
    const orderId = newOrderResult.insertId

    // поиск активных работников ресторана
    const [ cooksRes ] = await mysqlConnection.execute(getActiveCooksSQL)

    const cooks = cooksRes.map(
        row => ({
            id: row.Id
        })
    )        

    if(cooks.length === 0) {
        await mysqlConnection.rollback()
        throw new UserInputError('Сейчас ресторан закрыт')
    }

    // назначение блюдам сотрудников
    let i = 0
    const cookIds = items.map(() => {
        if(i === cooks.length) {
            i = 0
        }
        cooks[i].tasks += 1
        return cooks[i++].id
    })

    // добавление блюд в заказ
    for(let i = 0; i < items.length; i += 1) {
        const {
            itemId,
            amount
        } = items[i]

        await mysqlConnection.execute(
            addItemToOrderSQL,
            [ orderId, itemId, amount, cookIds[i] ]
        )
    }

    // запись транзакции
    await mysqlConnection.commit()

    return shownId
}