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

export {
    GET_ADDRESSES,
}