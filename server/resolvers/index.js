import test from './test.js'
import editUser from './editUser.js'
import getBonusPoints from './getBonusPoints.js'
import getUser from './getUser.js'
import getMenu from './getMenu.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import makeOrder from './makeOrder.js'
import addAddress from './addAddress.js'
import getAddresses from './getAddresses.js'
import addCard from './addCard.js'
import getCards from './getCards.js'
import registerUser from './registerUser.js'
import isRestaurantWorking from './isRestaurantWorking.js'
import getHistory from './getHistory.js'

import getActivityStatus from './getActivityStatus.js'
import setActivityStatus from './setActivityStatus.js'
import getBusyStatus from './getBusyStatus.js'
import setBusyStatus from './setBusyStatus.js'
import getCookTasks from './getCookTasks.js'
import setCookTaskStatus from './setCookTaskStatus.js'
import getCourierTask from './getCourierTask.js'
import finishCourierTask from './finishCourierTask.js'

const Query = {
    test,
    getBonusPoints,
    getUser,
    getMenu,
    getAddresses,
    getCards,
    isRestaurantWorking,
    getHistory,
    
    getActivityStatus,
    getBusyStatus,
    getCookTasks,
    getCourierTask,
}

const Mutation = {
    editUser,
    loginUser,
    registerUser,
    logoutUser,
    makeOrder,
    addAddress,
    addCard,

    setActivityStatus,
    setBusyStatus,
    setCookTaskStatus,
    finishCourierTask,
}

export {
    Query,
    Mutation,
}