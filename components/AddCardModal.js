import { useState } from 'react'

import { Button } from '@material-ui/core'
import { useModal } from 'react-hooks-async-modal'

import TextField from '@material-ui/core/TextField'
import validateCreditCard from '../lib/ulits/validateCreditCard.js'

import ModalWrap from './ModalWrap.js'

const filterNumbericField = (value, limit) => value
    .split('')
    .filter(ch => /^\d$/.test(ch))
    .join('')
    .substr(0, limit)

const AddCardModal = ({    
    onResolve,
    onReject,
}) => {
    const [ holderName, setHolderName ] = useState('')
    const [ cardNumber, setCardNumber ] = useState('')
    const [ cvv,        setCvv ]        = useState('')
    const [ expires,    setExpires ]    = useState('')

    // отображение

    let displayedCardNumber = ''
    cardNumber
        .split('')
        .forEach(
            digit => {
                if(
                    displayedCardNumber.length === 4 ||
                    displayedCardNumber.length === 9 ||
                    displayedCardNumber.length === 14
                ) {
                    displayedCardNumber += ' '
                }

                displayedCardNumber += digit
            }
        )

    let displayedExpires = ''
    expires
        .split('')
        .forEach(
            digit => {
                if(
                    displayedExpires.length === 2
                ) {
                    displayedExpires += '/'
                }

                displayedExpires += digit
            }
        )
    
    return (
        <ModalWrap
            onOutsideClick={onReject}
        >
            <TextField
                label="Имя владельца"
                placeholder="IVAN IVANOV"
                fullWidth
                variant="outlined"
                value={holderName}
                onChange={e => setHolderName(e.target.value)}
            />
            <div className="VerticalSpacer" />

            <TextField
                label="Номер"
                placeholder="1234 5678 9012 3456"
                fullWidth
                variant="outlined"
                value={displayedCardNumber}
                onChange={e => setCardNumber(filterNumbericField(e.target.value, 16))}
            />
            <div className="VerticalSpacer" />

            <div
                className="AddCardNumbersRow"
            >
                <TextField
                    label="CVV2"
                    placeholder="123"
                    variant="outlined"
                    value={cvv}
                    onChange={e => setCvv(filterNumbericField(e.target.value, 3))}
                />

                <div className="HorizontalSpacer" />

                <TextField
                    label="Срок действия"
                    placeholder="07/25"
                    variant="outlined"
                    value={displayedExpires}
                    onChange={e => setExpires(filterNumbericField(e.target.value, 4))}
                />
            </div>

            <div className="VerticalSpacer" />

            <div
                className="AddCardModalUI"
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
                        cardNumber,
                        expires,
                        cvv,
                        holderName: holderName.trim(),
                    })}
                    disabled={
                        !validateCreditCard(cardNumber) ||
                        !holderName.trim() ||
                        cvv.length !== 3  ||
                        expires.length !== 4
                    }
                >Добавить</Button>
            </div>

            <style jsx>{`
                .AddCardModalUI {
                    display: flex;
                    justify-content: flex-end;
                }

                .AddCardNumbersRow {
                    display: flex;
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

const useAddCardModal = () => useModal(AddCardModal)

export default AddCardModal
export {
    useAddCardModal,
}