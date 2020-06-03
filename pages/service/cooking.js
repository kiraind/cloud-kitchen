import Router from 'next/router'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { deepOrange } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'

import AppWrap from '../../components/AppWrap.js'
import ButtonWrap from '../../components/ButtonWrap.js'
import Logo from '../../components/Logo.js'

import {
    SET_TASK_STATUS,
} from '../../lib/queries.js'

const GET_TASKS = gql`
    query {
        getCookTasks {
            orderId
            itemId

            mealTitle
            orderShownId
            amount
            status
        }
    }
`

const Cooking = () => {
    // задачи
    const {
        data:    tasksData,
        loading: tasksLoading
    } = useQuery(GET_TASKS, {
        fetchPolicy: 'network-only',
    })

    const task = tasksLoading
        ? null
        : tasksData.getCookTasks.filter(task => task.status === 'IN_PROGRESS')[0]

    const [ setCookTaskStatus ] = useMutation(SET_TASK_STATUS)

    if(task === null) {
        return (
            <AppWrap loading />
        )
    }

    return (
        <AppWrap>
            <div
                className="SplashScreen"
            >
                <Logo />
            </div>

            <h3>Заказ:</h3>

            <div
                className="BigData"
            >№{task.orderShownId.toString().padStart(2, '0')}</div>

            <h3>Готовящееся блюдо:</h3>

            <div
                className="MediumData"
            >{task.mealTitle}</div>

            <h3>Количество штук:</h3>

            <div
                className="MediumData"
            >{task.amount}</div>

            <ButtonWrap>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={async () => {
                        await setCookTaskStatus({
                            variables: {
                                orderId: task.orderId,
                                itemId:  task.itemId,
                                status:  'READY'
                            }
                        })
                        Router.push('/service/cook')
                    }}
                >Готово</Button>
            </ButtonWrap>

            <style jsx>{`
                .SplashScreen {
                    height: 245px;
                    background-color: ${deepOrange[500]};
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .BigData, .MediumData {
                    padding: 15px 0 5px;
                    text-align: center;
                    line-height: 1;
                }

                .BigData {
                    font-size: 50px;
                }

                .MediumData {
                    font-size: 30px;
                }

            `}</style>
        </AppWrap>
    )
}

export default Cooking