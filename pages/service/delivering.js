import Router from 'next/router'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { deepOrange } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'

import AppWrap from '../../components/AppWrap.js'
import ButtonWrap from '../../components/ButtonWrap.js'
import Logo from '../../components/Logo.js'

const GET_TASKS = gql`
    query {
        getCourierTask {
            orderId
            orderShownId
            address {
                street
                building
                room
            }
        }
    }
`

const FINISH_TASK = gql`
    mutation finishCourierTask($orderId: Int!) {
        finishCourierTask(orderId: $orderId)
    }
`

const Delivering = () => {
    // задачи
    const {
        data:    tasksData,
        loading: tasksLoading
    } = useQuery(GET_TASKS, {
        fetchPolicy: 'network-only',
    })

    const task = tasksLoading ? null : tasksData.getCourierTask

    const [ finishCourierTask ] = useMutation(FINISH_TASK)

    console.log(task)

    if(task === null) {
        return <AppWrap loading></AppWrap>
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

            <h3>Адрес доставки:</h3>

            <div
                className="MediumData"
            >ул. {task.address.street}, д. {task.address.building}{task.address.room ? `, кв. ${task.address.room}` : ''}</div>

            <ButtonWrap>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={async () => {
                        try {
                            await finishCourierTask({
                                variables: {
                                    orderId: task.orderId
                                }
                            })
                            Router.push('/service/courier')
                        } catch(e) {
                            throw e
                        }
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
                    text-align: center;
                    line-height: 1;
                }

                .BigData {
                    font-size: 30px;
                }

                .MediumData {
                    padding: 15px 0;
                    font-size: 22px;
                }
            `}</style>
        </AppWrap>
    )
}

export default Delivering