import mysqlConnection from '../database/mysqlConnection.js'

export default async function test() {
    const [ rows, fields ] = await mysqlConnection.query(`SELECT 2 + 2 AS four`)

    const { four } = rows[0]

    return `Success, 2 + 2 = ${four}!`
}