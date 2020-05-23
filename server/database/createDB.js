import fs from 'fs'

import mysql from './mysqlConnection.js'

async function main() {
    const code = fs.readFileSync('sql/init.sql', 'utf-8')

    const [ rows, fields ] = await mysql.query(code)
}

main()
.then(() => process.exit())
.catch(err => [console.log(err), process.exit()])