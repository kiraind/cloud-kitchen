import { useState } from 'react'

import { Button } from '@material-ui/core'
import { useModal } from 'react-hooks-async-modal'

import TextField from '@material-ui/core/TextField'
import ButtonWrap from '../components/ButtonWrap.js'

import ModalWrap from './ModalWrap.js'

const AddAddressModal = ({    
    onResolve,
    onReject,
}) => {
    const [ street,   setStreet ]   = useState('')
    const [ building, setBuilding ] = useState('')
    const [ room,     setRoom ]     = useState('')
    
    return (
        <ModalWrap
            onOutsideClick={onReject}
        >
            <TextField
                label="Улица"
                placeholder="Ленина"
                fullWidth
                variant="outlined"
                value={street}
                onChange={e => setStreet(e.target.value)}
            />
            <div className="VerticalSpacer" />

            <TextField
                label="Здание"
                placeholder="5к2"
                fullWidth
                variant="outlined"
                value={building}
                onChange={e => setBuilding(e.target.value)}
            />
            <div className="VerticalSpacer" />

            <TextField
                label="Квартира / офис"
                placeholder="38"
                fullWidth
                variant="outlined"
                value={room}
                onChange={e => setRoom(e.target.value)}
            />
            <div className="VerticalSpacer" />

            <div
                className="AddAddressModalUI"
            >
                <Button
                    variant="text"
                    color="secondary"
                    onClick={() => onReject('Clicked "Cancel"')}
                >Отмена</Button>
                <div className="HorizontalSpacer" />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onResolve({
                        street:   street.trim(),
                        building: building.trim(),
                        room:     room.trim() || null
                    })}
                    disabled={!street.trim() || !building.trim()}
                >Добавить</Button>
            </div>

            <style jsx>{`
                .AddAddressModalUI {
                    display: flex;
                    justify-content: flex-end;
                }

                .HorizontalSpacer {
                    width: 15px;
                }

                .VerticalSpacer {
                    height: 15px;
                }
            `}</style>
        </ModalWrap>
    )
}

const useAddAddressModal = () => useModal(AddAddressModal)

export default AddAddressModal
export {
    useAddAddressModal,
}