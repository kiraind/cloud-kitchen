import fs from 'fs'

import mysqlConnection from './database/mysqlConnection.js'

const internalUserSQL = fs.readFileSync('sql/internalUser.sql', 'utf-8')

export default async function context({ req, res }) {
    const context = {
        req,
        res,
    }

    // req — express.js req
 
    const {
        token
    } = req.cookies

    const csrfToken = req.header('X-CSRF-Token')

    if(token && csrfToken) {
        const [ rows ] = await mysqlConnection.execute(
            internalUserSQL,
            [ token, csrfToken ]
        )

        if(rows[0]) {
            const user = rows[0]

            context.user = {
                // основная информация
                id:           user.Id,
                name:         user.Name,
                email:        user.Email,
                passwordHash: user.BcryptPassword,

                // роли
                customer: user.Customer,
                cook:     user.Cook,
                courier:  user.Courier,
            }            
        } else {
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
        }
    }
 
    return context
}