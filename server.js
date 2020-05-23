const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const port = parseInt(process.env.PORT, 10) || 3003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// modules loading
let graphqlMiddleware

import('./server/graphqlMiddleware.js').then(graphqlMiddlewareModule => {
    graphqlMiddleware = graphqlMiddlewareModule.default
})
.then(() => app.prepare())
.then(() => {
    const server = express()

    server.use(express.json())
    server.use(cookieParser())
    server.use('/graphql', graphqlMiddleware)
    
    server.get('*', (req, res) => {
        // default next.js handler SSR and so on
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) {
            throw err
        }
        console.log(`> Ready on http://localhost:${port}`)
    })
})