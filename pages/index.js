import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_USER = gql`
    query {
        getUser {
            name,
            email
        }
    }
`

const Index = ({

}) => {
    const { loading, error, data } = useQuery(GET_USER)

    return (
        <div>
            <div>{loading ? 'loading' : 'ready'}</div>
            <div>{error ? error : ''}</div>
            <pre>{ JSON.stringify(data, null, 4) }</pre>
        </div>
    )
}

export default Index