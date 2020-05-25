import fs from 'fs'
import mysqlConnection from '../database/mysqlConnection.js'

const bonusPointsSQL = fs.readFileSync('sql/bonusPoints.sql', 'utf-8')

export default async function getBonusPoints(_parent, _args, context) {
    if(!context.user) {
        return null
    }

    if(!context.user.customer) {
        return null
    }

    const [ rows ] = await mysqlConnection.execute(
        bonusPointsSQL,
        [ context.user.customer ]
    )

    if(rows[0]) {
        return rows[0].BonusPoints
    } else {
        return null
    }
}