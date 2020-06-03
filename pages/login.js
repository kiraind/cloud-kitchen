import { useState } from 'react'
import Router from 'next/router'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { red } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import AppWrap from '../components/AppWrap.js'
import Logo from '../components/Logo.js'
import ButtonWrap from '../components/ButtonWrap.js'

import validateEmail from '../lib/ulits/validateEmail.js'

const LOGIN = gql`
mutation login($credentials: LoginInput!) {
    loginUser(credentials: $credentials)
}
`

const Login = () => {
    const [ login ] = useMutation(LOGIN)

    const [ error,    setError ] = useState('')
    const [ email,    setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = async () => {
        if(!validateEmail(email)) {
            setError( 'Некорректный e-mail' )
            return
        }

        try {
            const res = await login({
                variables: {
                    credentials: {
                        email,
                        password
                    }
                }
            })

            if(res.data.loginUser === 'CUSTOMER') {
                Router.push('/')
            } else if(res.data.loginUser === 'COOK') {
                Router.push('/service/cook')
            } else {
                Router.push('/service/courier')
            }
        } catch(e) {
            setError( e.message.split(':')[1] )
        }
    }

    return (
        <AppWrap
            title="Вход"
        >
            <div
                className="Banner"
            >
                <Logo />
            </div>

            <ButtonWrap>
                <TextField
                    label="E-mail"
                    type="email"
                    fullWidth
                    variant="filled"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </ButtonWrap>

            <ButtonWrap>
                <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    variant="filled"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </ButtonWrap>

            { error && (
                <div
                    className="LoginError"
                >{error}</div>
            )}

            <ButtonWrap>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onLogin}
                >Войти</Button>
            </ButtonWrap>

            <ButtonWrap>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => Router.push('/register')}
                >Зарегистрироваться</Button>
            </ButtonWrap>

            <style jsx>{`
                .Banner {
                    height: 350px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .LoginError {
                    padding: 15px 15px 0;
                    color: ${red[500]};
                }
            `}</style>
        </AppWrap>
    )
}

export default Login