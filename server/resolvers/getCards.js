import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getCardsSQL = fs.readFileSync('sql/getCards.sql', 'utf-8')

export default async function getCards(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const [ cardsResult ] = await mysqlConnection.execute(
        getCardsSQL,
        [ customerId ]
    )

    const cards = cardsResult.map(row => ({
        id:             row.Id,
        lastFourDigits: row.CardNumber.substr(-4, 4),
    }))

    return cards
}