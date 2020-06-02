import { useRef } from "react"

const ModalWrap = ({
    children,

    onOutsideClick,
}) => {
    const outsideRef = useRef(null)

    return (
        <div
            className="ModalWrap"
            ref={outsideRef}
            onClick={
                e =>
                    // предотвратить вызов при клике на потомка
                    (e.target === outsideRef.current) &&
                    onOutsideClick &&
                    onOutsideClick('Clicked outside modal')
            }
        >
            <div
                className="ModalBody"
            >
                {children}
            </div>
            
            <style jsx>{`
                .ModalWrap {
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;

                    background-color: #ffffff99;
                    z-index: 1000;
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    cursor: pointer;
                    -webkit-tap-highlight-color: transparent;
                }

                .ModalBody {
                    background-color: white;
                    width: 100%;
                    max-width: 500px;
                    padding: 15px;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
}

export default ModalWrap