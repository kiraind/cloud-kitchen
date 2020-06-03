import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

import fetch from 'isomorphic-unfetch'

import { getCookie } from '../lib/ulits/cookies.js'

import { GET_CART } from './queries.js'

// запросы
const httpLink = createHttpLink({
    fetch,
    uri: '/graphql',
})

// авторизация
const authLink = setContext((_, { headers }) => {
    const csrfToken = getCookie('csrfToken')

    return csrfToken ? {
        headers: {
            ...headers,
            'X-CSRF-Token': csrfToken
        }
    } : {}
})

// управление состоянием
const cache = new InMemoryCache()

async function hydrateCache() {
    await persistCache({
        cache,
        storage: window.localStorage,
    })
}

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {
        Mutation: {
            setItemCount: (_parent, args, { cache }) => {
                // получаем старое значение корзины
                const { cart } = cache.readQuery({ query: GET_CART })

                const { id, count, price } = args

                // удаляем старое значение, если оно было
                let newCart = cart.filter(item => item.id !== id)

                if(count !== 0) {
                    // если надо обновить то добавляем новую запись
                    newCart = [
                        ...newCart,
                        {
                            id,
                            count,
                            price,
                            __typename: 'CartItem'
                        }
                    ]
                }

                newCart.sort( (a, b) => a.id - b.id )

                // сохраняем
                cache.writeData({
                    data: {
                        cart: newCart,
                    },
                })
            },
            clearCart: (_parent, _args, { cache }) => {
                cache.writeData({
                    data: {
                        cart: [],
                    },
                })
            }
        }
    },
})

cache.writeData({
    data: {
        cart: [],
    },
})

export default client
export {
    hydrateCache
}