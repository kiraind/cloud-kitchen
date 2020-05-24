import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getCookie } from '../lib/ulits/cookies.js'

const httpLink = createHttpLink({
    // fetch
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const csrfToken = getCookie('csrfToken')

    console.log(csrfToken)

    return csrfToken ? {
        headers: {
            ...headers,
            'X-CSRF-Token': csrfToken
        }
    } : {}
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client