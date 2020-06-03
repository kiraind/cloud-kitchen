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

import formatName from '../lib/ulits/formatName.js'
import validateEmail from '../lib/ulits/validateEmail.js'

const REGISTER = gql`
mutation register($user: UserInput!) {
    registerUser(user: $user)
}
`

const Register = () => {
    const [ register ] = useMutation(REGISTER)

    const [ error,    setError ]    = useState('')
    const [ name,     setName ]     = useState('')
    const [ email,    setEmail ]    = useState('')
    const [ password, setPassword ] = useState('')

    const onRegister = async () => {
        // проверяем валидность и исправляем формат имени
        const formattedName = formatName(name)
        if(!formattedName) {
            setError( 'Некорректное имя' )
            return
        }
        if(formattedName.length > 64) {
            setError( 'Слишком длинное имя' )
            return
        }

        // проверяем валидность email
        if(!validateEmail(email)) {
            setError( 'Некорректный e-mail' )
            return
        }
        if(email.length > 64) {
            setError( 'Слишком длинный email' )
            return
        }

        try {
            const res = await register({
                variables: {
                    user: {
                        name: formattedName,
                        email,
                        password
                    }
                }
            })

            if(res.data.registerUser === 'CUSTOMER') {
                Router.push('/')
            } else if(res.data.registerUser === 'COOK') {
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
            title="Регистрация"
        >
            <div
                className="Banner"
            >
                <Logo />
            </div>

            <ButtonWrap>
                <TextField
                    label="Имя"
                    placeholder="Анастасия"
                    fullWidth
                    variant="filled"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </ButtonWrap>

            <ButtonWrap>
                <TextField
                    label="E-mail"
                    type="email"
                    placeholder="username@example.com"
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
                    className="RegisterError"
                >{error}</div>
            )}

            <ButtonWrap>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onRegister}
                >Зарегистрироваться</Button>
            </ButtonWrap>

            <ButtonWrap>
                <Button
                    variant="text"
                    color="secondary"
                    fullWidth
                    onClick={() => Router.push('/login')}
                >Уже есть аккаунт</Button>
            </ButtonWrap>

            <style jsx>{`
                .Banner {
                    height: 300px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .RegisterError {
                    padding: 15px 15px 0;
                    color: ${red[500]};
                }
            `}</style>
        </AppWrap>
    )
}

export default Register