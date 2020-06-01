import { Button } from '@material-ui/core'
import { useModal } from 'react-hooks-async-modal'

import ModalWrap from './ModalWrap.js'

const AlertModal = ({
    message,
    
    onResolve,
    onReject,
}) => (
    <ModalWrap
        onOutsideClick={onResolve}
    >
        <p>{message}</p>

        <div
            className="AlertModalUI"
        >
            <Button
                variant="outlined"
                color="secondary"
                onClick={onResolve}
                margin
            >Ок</Button>
        </div>

        <style jsx>{`
            p {
                margin: 0;
                margin-bottom: 15px;
                font-size: 18px;
            }

            .AlertModalUI {
                display: flex;
                justify-content: flex-end;
            }
        `}</style>
    </ModalWrap>
)

const useAlertModal = () => useModal(AlertModal)

export default AlertModal
export {
    useAlertModal,
}