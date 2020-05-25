import fs from 'fs'

import mysqlConnection from '../database/mysqlConnection.js'

const logoutUserSQL = fs.readFileSync('sql/logoutUser.sql', 'utf-8')

export default async function logoutUser(_parent, _args, context) {
    const { req, res } = context

    const {
        token
    } = req.cookies

    const csrfToken = req.header('X-CSRF-Token')

    if(token && csrfToken) {
        await mysqlConnection.execute(
            logoutUserSQL,
            [ token, csrfToken ]
        )
    }

    // убираем неактуальные куки
    res.cookie(
        'token',
        'deleted', 
        {
            // моментально истекающая
            expires: new Date(0),
            httpOnly: true,
        }
    )

    res.cookie(
        'csrfToken',
        'deleted', 
        {
            // моментально истекающая
            expires: new Date(0),
            httpOnly: false,
        }
    )

    return 0
}