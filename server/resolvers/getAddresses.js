import fs from 'fs'

import apollo from 'apollo-server-express'
const { AuthenticationError } = apollo

import mysqlConnection from '../database/mysqlConnection.js'

const getAddressesSQL = fs.readFileSync('sql/getAddresses.sql', 'utf-8')

export default async function getAddresses(_parent, _args, context) {
    if(!context.user) {
        throw new AuthenticationError('Нет авторизации')
    }

    const customerId = context.user.customer

    const [ addressesResult ] = await mysqlConnection.execute(
        getAddressesSQL,
        [ customerId ]
    )

    const addresses = addressesResult.map(row => ({
        id:       row.Id,
        street:   row.Street,
        building: row.Building,
        room:     row.Room,
    }))

    return addresses
}