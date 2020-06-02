import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const addAddressSQL = fs.readFileSync('sql/addAddress.sql', 'utf-8')

export default async function addAddress(_parent, args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const {
        street,
        building,
        room,
    } = args.address

    const [ newAddressResult ] = await mysqlConnection.execute(
        addAddressSQL,
        [ customerId, street, building, room ]
    )

    const addressId = newAddressResult.insertId

    return {
        id:      addressId,
        street,
        building,
        room,
    }
}