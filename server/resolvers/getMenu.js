import fs from 'fs'

import mysqlConnection from '../database/mysqlConnection.js'

const menuItemsSQL = fs.readFileSync('sql/menuItems.sql', 'utf-8')

export default async function getMenu() {
    const [ rows ] = await mysqlConnection.execute(
        menuItemsSQL
    )

    return rows.map(
        item => ({
            id:       item.Id,
            title:    item.Title,
            price:    parseFloat(item.Price) * 100, // перевести рубли в копейки
            calories: item.Calories
        })
    )
}