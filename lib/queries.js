import gql from 'graphql-tag'

const GET_ADDRESSES = gql`
    query getAddresses {
        getAddresses {
            id
            street
            building
            room
        }
    }
`

const GET_CARDS = gql`
    query getCards {
        getCards {
            id
            lastFourDigits
        }
    }
`

const GET_CART = gql`
    query {
        cart @client {
            id
            count
        }
    }
`

const SET_ITEM_COUNT = gql`
    mutation($id: Int!, $count: Int!) {
        setItemCount(id: $id, count: $count) @client
    }
`

export {
    GET_ADDRESSES,
    GET_CARDS,
    GET_CART,
    SET_ITEM_COUNT,
}