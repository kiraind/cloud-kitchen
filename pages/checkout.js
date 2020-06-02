import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import NoSsr from '@material-ui/core/NoSsr'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import AppWrap from '../components/AppWrap.js'
import MenuItems from '../components/MenuItems.js'
import ButtonWrap from '../components/ButtonWrap.js'

import { useAddAddressModal } from '../components/AddAddressModal.js'
import { useAlertModal } from '../components/AlertModal.js'

import { GET_ADDRESSES } from '../lib/queries.js'

const ADD_ADDRESS = gql`
    mutation addAddress($address: AddressInput!) {
        addAddress(address: $address) {
            id
        }
    }
`

const CheckoutForm = () => {
    const callAddAddressModal = useAddAddressModal()
    const callAlertModal      = useAlertModal()

    const {
        loading: addressesLoading,
        data:    addressesData,
        refetch: refetchAddresses
    } = useQuery(GET_ADDRESSES)

    const addresses = addressesLoading ? [] : addressesData.getAddresses

    const [ addressId, setAddressId ] = useState(addresses[0] ? addresses[0].id : 'new')
    useEffect(() => {
        if(addresses[0]) {
            setAddressId( addresses[0].id )
        }
    }, [addressesLoading])

    const [ addAddress ] = useMutation(ADD_ADDRESS)

    const addNewAddress = async () => {
        try {
            // добавить новый адрес
            const newAddress = await callAddAddressModal()

            const result = await addAddress({
                variables: {
                    address: newAddress,
                }
            })

            const newAddressId = result.data.addAddress.id

            await refetchAddresses()
            setAddressId(newAddressId)
        } catch(err) {
            // пользователь отменил ввод
            if(typeof err === 'string') {
                return
            }

            // ошибка
            await callAlertModal({
                message: err.message
            })
        }
    }

    const onAddressSelectChange = e => {
        const { value } = e.target

        if(value !== 'new') {
            setAddressId(value)
            return
        }

        addNewAddress()
    }

    const addressItems = addresses.map(
        addr =>
        <MenuItem
            key={addr.id}
            value={addr.id}
        >ул. {addr.street}, д. {addr.building}{addr.room ? `, кв. ${addr.room}` : ''}</MenuItem>
    )

    return (
        <NoSsr>
            
            <ButtonWrap>
                {
                    addresses.length > 0 ? (
                        <>
                        <div className="VerticalSpacer" />
                        <FormControl
                            variant="outlined"
                            fullWidth
                        >
                            <InputLabel>Адрес доставки</InputLabel>
                            <Select
                                value={addressId}
                                onChange={onAddressSelectChange}
                                label="Адрес доставки"
                            >
                                {addressItems}
                                <MenuItem value="new">Добавить новый</MenuItem>
                            </Select>
                        </FormControl>
                        </>
                    ) : (
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={addNewAddress}
                        >Ввести адрес доставки</Button>
                    )
                }

                
            </ButtonWrap>
            
            <style jsx>{`
                .VerticalSpacer {
                    height: 15px;
                }
            `}</style>
        </NoSsr>
    )
}

const Checkout = () => {
    return (
        <AppWrap
            title="Оформление заказа"
            header
            headerText="Назад"
            headerLink="/"
        >

            <MenuItems
                onlyPresent
            />

            <CheckoutForm />
        </AppWrap>
    )
}

export default Checkout