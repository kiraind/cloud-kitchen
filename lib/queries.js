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

export {
    GET_ADDRESSES,
    GET_CARDS,
}