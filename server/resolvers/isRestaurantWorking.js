import fs from 'fs'

import mysqlConnection from '../database/mysqlConnection.js'

const isRestaurantWorkingSQL = fs.readFileSync('sql/isRestaurantWorking.sql', 'utf-8')

export default async function isRestaurantWorking() {
    const [ rows ] = await mysqlConnection.execute(isRestaurantWorkingSQL)

    return rows[0].IsRestaurantWorking === 1
}