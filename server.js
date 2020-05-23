const fs = require('fs')

const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')

const { ApolloServer } = require('apollo-server-express')

const port = parseInt(process.env.PORT, 10) || 3003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// load local server modules
let resolvers
let context

import('./server/resolvers/index.js').then(resolversModule => {
    resolvers = resolversModule
})
import('./server/context.js').then(contextModule => {
    context = contextModule.default
})
.then(() => app.prepare())
.then(() => {
    const server = express()

    server.use(express.json())
    server.use(cookieParser())

    const apolloServer = new ApolloServer({
        typeDefs: fs.readFileSync('server/schema.graphql', 'utf-8'),
        resolvers: { ...resolvers },
        context,
        playground: {
            settings: {
              "request.credentials": "include"
            }
        }
    })

    apolloServer.applyMiddleware({ app: server })
    
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