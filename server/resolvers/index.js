import test from './test.js'
import editUser from './editUser.js'
import getBonusPoints from './getBonusPoints.js'
import getUser from './getUser.js'
import loginUser from './loginUser.js'
import registerUser from './registerUser.js'

const Query = {
    test,
    getBonusPoints,
    getUser,
}

const Mutation = {
    editUser,
    loginUser,
    registerUser,
}

export {
    Query,
    Mutation,
}