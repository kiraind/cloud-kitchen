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

const GET_BUSY_STATUS = gql`
    query {
        getBusyStatus
    }
`

const SET_BUSY_STATUS = gql`
    mutation setBusyStatus($status: Boolean!) {
        setBusyStatus(status: $status)
    }
`

const GET_TASKS = gql`
    query {
        getCourierTask {
            address {
                street
                building
                room
            }
        }
    }
`

const Courier = () => {
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

    const {
        data:    busyStatusData,
        loading: busyStatusLoading,
        refetch: refetchBusyStatus
    } = useQuery(GET_BUSY_STATUS, { fetchPolicy: 'network-only' })

    const busy = !busyStatusLoading && busyStatusData.getBusyStatus

    const [ setBusyStatus ] = useMutation(SET_BUSY_STATUS)

    const toggleBusyStatus = async () => {
        await setBusyStatus({
            variables: {
                status: !busy
            }
        })
        await refetchBusyStatus()
    }

    // // задачи
    const {
        data:    tasksData,
        loading: tasksLoading
    } = useQuery(GET_TASKS, {
        fetchPolicy: 'network-only',
        pollInterval: working ? 2000 : 0,
    })

    const task = !working ? null : tasksLoading ? null : tasksData.getCourierTask

    const [ logout ] = useMutation(LOGOUT)

    return (
        <AppWrap>
            <div
                className="SplashScreen"
            >
                <Logo />
            </div>

            {
                busy && (
                    <ButtonWrap>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={toggleBusyStatus}
                        >Готов к получению заказа</Button>
                    </ButtonWrap>
                )
            }

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

            {task && (
                <div
                    className="TaskItem" 
                >
                    <div
                        className="Title"
                    >ул. {task.address.street}, д. {task.address.building}{task.address.room ? `, кв. ${task.address.room}` : ''}</div>

                    <Button
                        variant={"outlined"}
                        color="primary"
                        onClick={async () => {
                            await toggleBusyStatus()
                            Router.push('/service/delivering')
                        }}
                    >Забрать</Button>
                </div>
            )}

            {working && !task && (
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

export default Courier