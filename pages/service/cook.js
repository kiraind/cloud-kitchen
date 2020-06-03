import Router from 'next/router'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { deepOrange } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'

import { useAlertModal } from '../../components/AlertModal.js'
import { useConfirmModal } from '../../components/ConfirmModal.js'

import AppWrap from '../../components/AppWrap.js'
import ButtonWrap from '../../components/ButtonWrap.js'
import Logo from '../../components/Logo.js'

import {
    SET_TASK_STATUS,
    LOGOUT
} from '../../lib/queries.js'

const GET_STATUS = gql`
    query {
        getActivityStatus
    }
`

const SET_STATUS = gql`
    mutation setActivityStatus($status: Boolean!) {
        setActivityStatus(status: $status)
    }
`

const GET_TASKS = gql`
    query {
        getCookTasks {
            orderId
            itemId

            amount
            mealTitle
            status
        }
    }
`

const Cook = () => {
    const callAlertModal   = useAlertModal()
    const callConfirmModal = useConfirmModal()

    // статус

    const {
        data:    statusData,
        loading: statusLoading,
        refetch: refetchStatus
    } = useQuery(GET_STATUS, { fetchPolicy: 'network-only' })

    const working = !statusLoading && statusData.getActivityStatus

    const [ setActivityStatus ] = useMutation(SET_STATUS)

    const toggleStatus = async () => {
        // alert
        const newStatus = !working

        try {
            await callConfirmModal({
                message: `Вы уверены, что хотите ${newStatus ? 'начать' : 'завершить'} рабочий день?`
            })

            await setActivityStatus({
                variables: {
                    status: newStatus
                }
            })

            await refetchStatus()
        } catch(err) {
            // пользователь отменил ввод
            if(typeof err === 'string') {
                return
            }

            // ошибка
            await callAlertModal({
                message: err.message
            })
        }
    }

    // задачи
    const {
        data:    tasksData,
        loading: tasksLoading
    } = useQuery(GET_TASKS, {
        fetchPolicy: 'network-only',
        pollInterval: working ? 2000 : 0,
    })

    const tasks = !working ? [] : tasksLoading ? [] : tasksData.getCookTasks

    console.log(tasks)

    const [ setCookTaskStatus ] = useMutation(SET_TASK_STATUS)

    const taskItems = tasks.map(task => (
        <div
            key={task.orderId + '_' + task.itemId}
            className="TaskItem" 
        >
            <div
                className="Title"
            >{task.mealTitle} ×{task.amount}</div>

            <Button
                variant={"outlined"}
                color="primary"
                onClick={async () => {
                    await setCookTaskStatus({
                        variables: {
                            orderId: task.orderId,
                            itemId:  task.itemId,
                            status:  'IN_PROGRESS'
                        }
                    })
                    Router.push('/service/cooking')
                }}
            >Начать готовить</Button>

            <style jsx>{`
                .TaskItem {
                    margin-top: 15px;
                    padding: 15px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    box-shadow: 0px 1px 5px rgba(0,0,0,0.175)
                }

                .TaskItem .Title {
                    margin-right: 15px;
                }  
            `}</style>
        </div>
    ))

    const [ logout ] = useMutation(LOGOUT)

    return (
        <AppWrap>
            <div
                className="SplashScreen"
            >
                <Logo />
            </div>

            <ButtonWrap>
                <Button
                    variant={ !working ? "contained" : "outlined" }
                    color="primary"
                    fullWidth
                    onClick={toggleStatus}
                >{ !working ? "Начать рабочий день" : "Завершить рабочий день" }</Button>
            </ButtonWrap>

            {
                !working && (
                    <ButtonWrap>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={async () => {
                                await logout()
                                Router.push('/')
                            }}
                        >Выйти</Button>
                    </ButtonWrap>
                )
            }

            {taskItems}

            {working && taskItems.length === 0 && (
                <div
                    className="NoneMessage"
                >Пока нет заказов</div>
            )}

            <style jsx>{`
                .SplashScreen {
                    height: ${!working ? '500px' : '245px'};
                    background-color: ${deepOrange[500]};
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    ${ !statusLoading ? `transition: height .3s ease-out;` : `` }
                }

                .NoneMessage {
                    padding: 45px 15px;
                    font-size: 18px;
                    text-align: center;
                    color: #a0a0a0;
                }
            `}</style>
        </AppWrap>
    )
}

export default Cook