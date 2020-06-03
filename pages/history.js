import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import AppWrap from '../components/AppWrap.js'

const STATUS_TEXT = {
    'COOKING':    'Готовится',
    'DELIVERING': 'Доставка',
    'DONE':       'Завершен',
}

const HistoryItem = ({
    order,
}) => {
    const totalCost = order.items.reduce(
        (acc, item) => acc + item.amount * item.item.price,
        0
    )

    return (
        <div
            className="HistoryItem"
        >
            <div
                className="HistoryItemTitle"
            >Заказ  №{order.shownId.toString().padStart(2, '0')} — {STATUS_TEXT[order.status]}</div>

            <div>ул. {order.address.street}, д. {order.address.building}</div>

            <table
                className="CheckTable"
            >
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.item.id}>
                            <td className="CheckTitle">{item.item.title}</td>
                            <td className="CheckCount">×{item.amount}</td>
                            <td className="CheckPrice">+&nbsp;{(item.amount * item.item.price / 100).toFixed(2)}</td>
                        </tr>
                    ))}

                    <tr
                        className="TotalRow"
                    >
                        <td className="CheckTitle">ИТОГО</td>
                        <td className="CheckCount"></td>
                        <td className="CheckPrice">=&nbsp;{(totalCost / 100).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <style jsx>{`
                .HistoryItem {
                    margin-top: 15px;
                    padding: 15px;

                    box-shadow: 0px 1px 5px rgba(0,0,0,0.175)
                }

                .HistoryItemTitle {
                    font-size: 16px;
                    font-weight: bold;
                }

                .CheckTable {
                    width: 100%;
                    border-spacing: 0;
                    border-top: solid #c1c1c1 1px;
                    margin-top: 10px;
                    padding-top: 10px;
                }

                .CheckTitle {

                }

                .CheckCount {
                    width: 30px;
                    text-align: right;
                }

                .CheckPrice {
                    width: 65px;
                    text-align: right;
                }

                .TotalRow {
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}

const GET_HISTORY = gql`
    query {
        getHistory {
            id
            shownId
            status
            address {
                street
                building
            }
            items {
                item {
                    id
                    title
                    price
                }
                amount
            }
        }
    }
`

const History = () => {
    const { loading, data } = useQuery(GET_HISTORY, {
        pollInterval: 30 * 1000, // полминуты
        fetchPolicy: 'network-only',
    })

    if (loading) {
        return (
            <AppWrap
                loading
            />
        )
    }

    return (
        <AppWrap
            header
            title="История заказов"
            headerText="Назад"
            headerLink="/"
        >
            {
                data.getHistory.map(
                    order => <HistoryItem key={order.id} order={order} />
                )
                
            }
        </AppWrap>
    )
}

export default History