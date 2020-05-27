import { useState } from 'react'
import Router from 'next/router'

import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { red } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import AppWrap from '../components/AppWrap.js'
import Logo from '../components/Logo.js'
import ButtonWrap from '../components/ButtonWrap.js'

import formatName from '../lib/ulits/formatName.js'
import validateEmail from '../lib/ulits/validateEmail.js'

const EDIT_USER = gql`
    mutation edit($user: UserEditInput!) {
        editUser(user: $user) {
            name
            email
        }
    }
`

const EditProfileForm = ({
    initialName,
    initialEmail
}) => {
    const [ error,    setError ]    = useState('')

    const [ name,     setName ]     = useState(initialName)
    const [ email,    setEmail ]    = useState(initialEmail)
    const [ password, setPassword ] = useState('')

    const nameChanged     = name     !== initialName
    const emailChanged    = email    !== initialEmail
    const passwordChanged = password !== ''

    const [ edit ] = useMutation(EDIT_USER)

    const onEdit = async () => {
        const user = {}

        if(nameChanged) {
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

            user.name = name
        } else {
            user.name = null
        }

        if(emailChanged) {
            // проверяем валидность email
            if(!validateEmail(email)) {
                setError( 'Некорректный e-mail' )
                return
            }
            if(email.length > 64) {
                setError( 'Слишком длинный email' )
                return
            }

            user.email = email
        } else {
            user.email = null
        }

        if(passwordChanged) {
            user.password = password
        } else {
            user.password = null
        }

        try {
            await edit({
                variables: {
                    user
                }
            })

            Router.reload()
        } catch(e) {
            setError( e.message.split(':')[1] )
        }
    }

    return (
        <>
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
                    label="Новый пароль"
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
                    onClick={onEdit}
                    disabled={
                        // если ничего не поменялось
                        !(
                            nameChanged ||
                            emailChanged ||
                            passwordChanged
                        )
                    }
                >Сохранить изменения</Button>
            </ButtonWrap>

            <style jsx>{`
                .RegisterError {
                    padding: 15px 15px 0;
                    color: ${red[500]};
                }
            `}</style>
        </>
    )
}

const GET_USER = gql`
    query {
        getUser {
            name,
            email
        }
    }
`

const Profile = () => {
    const {
        loading: userLoading,
        data: userData
    } = useQuery(GET_USER)



    if(userLoading) {
        return (
            <AppWrap
                title="Профиль"
                header
                loading
            />
        )
    }

    return (
        <AppWrap
            title="Профиль"
            header
            headerText="Меню"
            headerLink="/"
        >
            <h3>Редактирование профиля</h3>

            <EditProfileForm
                initialName={userData.getUser.name}
                initialEmail={userData.getUser.email}
            />

            <style jsx>{`
                h3 {
                    margin: 20px 15px 0;
                    font-size: 18px;
                }
            `}</style>
        </AppWrap>
    )
}

// Profile.getInitialProps = async ({}) => {
//     return {
//         initialName: 'b'
//     }
// }

export default Profile