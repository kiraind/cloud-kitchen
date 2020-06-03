import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import MenuItem from './MenuItem.js'

import { GET_CART, SET_ITEM_COUNT } from '../lib/queries.js'

const GET_MENU = gql`
    query menu {
        getMenu {
            id,
            title,
            price,
            calories
        }
    }
`

const MenuItems = ({
    onlyPresent=false,
}) => {
    const {
        loading: menuLoading,
        data:    menuData
    } = useQuery(GET_MENU)

    const {
        data: cartData,
    } = useQuery(GET_CART)

    const [ setItemCount ] = useMutation(SET_ITEM_COUNT)

    const selectedItems = cartData.cart.reduce(
        (acc, item) => ({ ...acc, [item.id]: item.count }),
        {}
    )

    if(menuLoading) {
        return null
    }

    const items = menuData.getMenu
        .filter(
            item => onlyPresent ? item.id in selectedItems : true
        )
        .map(
            item => (
                <MenuItem
                    key={item.id}
                    item={item}
                    count={selectedItems[item.id]}
                    setItemCount={setItemCount}
                />
            )
        )

    return (
        <section
            className="MenuItems"
        >
            {items.length !== 0 ? items : (
                <div
                    className="NoneMessage"
                >В корзине пусто</div>
            )}

            <style jsx>{`
                .NoneMessage {
                    padding: 45px 15px;
                    font-size: 18px;
                    text-align: center;
                    color: #a0a0a0;
                }
            `}</style>
        </section>
    )
}

export default MenuItems