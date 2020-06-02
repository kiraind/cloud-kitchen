import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const addCardSQL = fs.readFileSync('sql/addCard.sql', 'utf-8')

export default async function addCard(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const {
        cardNumber,
        expires,
        cvv,
        holderName,
    } = args.card

    const [ newCardResult ] = await mysqlConnection.execute(
        addCardSQL,
        [ customerId, cardNumber, expires, cvv, holderName ]
    )

    const cardId = newCardResult.insertId

    return {
        id:             cardId,
        lastFourDigits: cardNumber.substr(-4, 4),
    }
}