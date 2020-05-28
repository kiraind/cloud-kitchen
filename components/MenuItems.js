import { useState } from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import MenuItem from './MenuItem.js'

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
    const { loading, data } = useQuery(GET_MENU)

    const [ selectedItems, setSelectedItems ] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
            ? JSON.parse( localStorage.getItem('order') )
            : {}
    )

    if(loading) {
        return null
    }

    const setItemCount = (itemId, count) => {
        let newSelectedItems

        if(count === 0) {
            const { [itemId]: _removed, ...rest } = selectedItems
            newSelectedItems = rest
        } else {
            newSelectedItems = {
                ...selectedItems,
                [itemId]: count,
            }
        }

        setSelectedItems(newSelectedItems)
        localStorage.setItem('order', JSON.stringify(newSelectedItems))
    }

    const items = data.getMenu
        .filter(
            item => onlyPresent ? item.id in selectedItems : true
        )
        .map(
            item => (
                <MenuItem
                    key={item.id}
                    item={item}
                    count={selectedItems[item.id]}
                    setItemCount={setItemCount.bind(null, item.id)}
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