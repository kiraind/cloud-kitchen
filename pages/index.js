import Router from 'next/router'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { deepOrange } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'

import AppWrap from '../components/AppWrap.js'
import Logo from '../components/Logo.js'
import ButtonWrap from '../components/ButtonWrap.js'

const SplashScreen = () => (
    <>
        <div
            className="SplashScreen"
        >
            <Logo />
        </div>

        <ButtonWrap>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => Router.push('/register')}
            >Регистрация</Button>
        </ButtonWrap>
        <ButtonWrap>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => Router.push('/login')}
            >Вход</Button>
        </ButtonWrap>

        <style jsx>{`
            .SplashScreen {
                height: 500px;
                background-color: ${deepOrange[500]};
                box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

                display: flex;
                justify-content: center;
                align-items: center;
            }
        `}</style>
    </>
)

const GET_USER = gql`
    query {
        getUser {
            name,
            email
        }
    }
`

const Index = () => {
    const { loading, error, data } = useQuery(GET_USER)

    if(loading) {
        return (
            <AppWrap
                loading
            />
        )
    }

    if(data.getUser === null) {
        return (
            <AppWrap>
                <SplashScreen />
            </AppWrap>
        )
    }

    return (
        <AppWrap
            header
        >
            <div>menu</div>
        </AppWrap>
    )
}

export default Index