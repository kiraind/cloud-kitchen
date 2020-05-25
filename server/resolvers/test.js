import mysqlConnection from '../database/mysqlConnection.js'

export default async function test(_parent, _args, context) {
    const [ rows ] = await mysqlConnection.query(`SELECT 2 + 2 AS four`)
    const { four } = rows[0]

    return `Hello${context.user ? ', ' + context.user.name : ''}, 2 + 2 = ${four}!`
}