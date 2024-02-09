require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routers/router')
const socket = require('../api/socket/socket')

const app = express()
app.use(cors())

app.use(express.json())
app.use(router)

socket.listen(process.env.PORT_SOCKET || 4000);
app.listen(process.env.PORT)


