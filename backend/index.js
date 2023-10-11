const express = require('express')
const userRouter = require('./routes/userRouter')
const app = express()
require('dotenv').config()
const cors = require('cors')
const messageRouter = require('./routes/messageRouter')
const port = process.env.PORT || 3000

const corsOptions = {
    origin: ['http://localhost:5173', 'exp://192.168.1.103:8081', 'exp://192.168.1.168:8081'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())//tem de vir sempre antes
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)

app.listen(port, ()=>console.log(`Server running at ${port}`))