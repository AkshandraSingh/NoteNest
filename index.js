require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');

require('./config/modelConfig')
const commonRouter = require('./urls')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', commonRouter)

const PORT = process.env.PORT || 9001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ✅`)
})
