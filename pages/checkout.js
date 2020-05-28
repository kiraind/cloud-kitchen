import AppWrap from '../components/AppWrap.js'
import MenuItems from '../components/MenuItems.js'

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

        </AppWrap>
    )
}

export default Checkout