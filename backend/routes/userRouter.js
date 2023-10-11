const express = require('express')
const { register, login, getAll } = require('../controllers/userControllers')
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/get', getAll)

module.exports = userRouter