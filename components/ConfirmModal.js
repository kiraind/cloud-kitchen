import { Button } from '@material-ui/core'
import { useModal } from 'react-hooks-async-modal'

import ModalWrap from './ModalWrap.js'

const ConfirmModal = ({
    message,
    
    onResolve,
    onReject,
}) => (
    <ModalWrap
        onOutsideClick={onReject}
    >
        <p>{message}</p>

        <div
            className="ConfirmModalUI"
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
                onClick={() => onResolve()}
            >Ок</Button>
        </div>

        <style jsx>{`
            p {
                margin: 0;
                margin-bottom: 15px;
                font-size: 18px;
            }

            .ConfirmModalUI {
                display: flex;
                justify-content: flex-end;
            }

            .HorizontalSpacer {
                width: 15px;
            }
        `}</style>
    </ModalWrap>
)

const useConfirmModal = () => useModal(ConfirmModal)

export default ConfirmModal
export {
    useConfirmModal,
}