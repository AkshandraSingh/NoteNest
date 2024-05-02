const express = require('express')

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoute')

const commonRouter = express.Router()

commonRouter.use('/users', userRouter)
commonRouter.use('/notes', noteRouter)

module.exports = commonRouter
