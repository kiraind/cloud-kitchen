import fs from 'fs'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'

// resolvers
import test from './resolvers/test.js'

let schema = graphql.buildSchema(
    fs.readFileSync('server/schema.graphql', 'utf-8')
)

const root = {
    test,
}

const graphqlMiddleware = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: process.env.NODE_ENV !== 'production'
})

export default graphqlMiddleware