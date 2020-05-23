import mysql from 'mysql2'

const connectionSync = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : 'cloud-kitchen',

    multipleStatements: true,
})

const connection = connectionSync.promise()

export default connection