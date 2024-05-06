const express = require('express')
const path = require('path')

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoute')

const commonRouter = express.Router()

commonRouter.use(express.static(path.join(__dirname, 'views')));

commonRouter.use('/users', userRouter)
commonRouter.use('/notes', noteRouter)
commonRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ".", 'views', 'landingPage.html'));
});

module.exports = commonRouter
