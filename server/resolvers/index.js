import test from './test.js'
import editUser from './editUser.js'
import getBonusPoints from './getBonusPoints.js'
import getUser from './getUser.js'
import getMenu from './getMenu.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'

const Query = {
    test,
    getBonusPoints,
    getUser,
    getMenu,
}

const Mutation = {
    editUser,
    loginUser,
    registerUser,
    logoutUser,
}

export {
    Query,
    Mutation,
}