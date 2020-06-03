import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import FastFoodIcon from './icons/FastFoodIcon.js'

const MenuItem = ({
    item,
    setItemCount,
    count=0,
}) => (
    <div
        className="MenuItem"
    >
        <div
            className="MenuItemIcon"
        >
            <FastFoodIcon
                size="45"
                color="#afafaf"
            />
        </div>

        <div
            className="MenuItemInfo"
        >
            <div
                className="MenuItemTitle"
            >{item.title}</div>
            <div
                className="MenuItemCalories"
            >{Math.round(item.calories / 1000)}&nbsp;ккал</div>
            <div
                className="MenuItemPrice"
            >{item.price / 100}&nbsp;₽</div>
        </div>

        <div
            className="MenuItemUI"
        >
            <ButtonGroup
                size="small"
            >
                <Button
                    disabled={count === 0}
                    onClick={() => setItemCount({
                        variables: {
                            id: item.id,
                            price: item.price,
                            count: count - 1,
                        }
                    })}
                >−</Button>
                <Button
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                >{count}</Button>
                <Button
                    onClick={() => setItemCount({
                        variables: {
                            id: item.id,
                            price: item.price,
                            count: count + 1,
                        }
                    })}
                >+</Button>
            </ButtonGroup>
        </div>

        <style jsx>{`
            .MenuItem {
                margin-top: 15px;

                display: flex;
                align-items: center;
                padding-right: 15px;

                box-shadow: 0px 1px 5px rgba(0,0,0,0.175)
            }

            .MenuItemIcon {
                width: 90px;
                height: 90px;

                display: flex;
                align-items: center;
                justify-content: center;
            }

            .MenuItemInfo {
                padding: 15px;
                padding-left: 0;

                display: flex;
                justify-content: center;
                flex-direction: column;
            }

            .MenuItemTitle {
                font-size: 18px;
            }

            .MenuItemCalories, .MenuItemPrice {
                font-size: 14px;
            }

            .MenuItemCalories {
                color: #9a9a9a;
            }

            .MenuItemUI {
                margin-left: auto;
                align-self: center;
            }
        `}</style>
    </div>
)

export default MenuItem