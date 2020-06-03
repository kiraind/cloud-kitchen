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

const Query = {
    test,
    getBonusPoints,
    getUser,
    getMenu,
    getAddresses,
    getCards,
    isRestaurantWorking,
    getHistory,
}

const Mutation = {
    editUser,
    loginUser,
    registerUser,
    logoutUser,
    makeOrder,
    addAddress,
    addCard,
}

export {
    Query,
    Mutation,
}