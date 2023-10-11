const express = require('express')
const { getPessoasFaladas, getConversa, postMessages } = require('../controllers/messageControllers')
const messageRouter = express.Router()

messageRouter.get('/gettalk/:id', getPessoasFaladas)
messageRouter.post('/conversation/:id', getConversa)
messageRouter.post('/post/:id', postMessages)

module.exports = messageRouter