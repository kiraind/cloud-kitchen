const ButtonWrap = ({
    children
}) => (
    <div
        className="ButtonWrap"
    >
        {children}
        <style jsx>{`
            .ButtonWrap {
                padding: 15px 15px 0;
            }
        `}</style>
    </div>
)

export default ButtonWrap