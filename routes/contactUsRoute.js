const express = require('express')

const contactUsController = require('../controllers/contactUsController')

const contactUsRouter = express.Router()

contactUsRouter.post('/addContactUs', contactUsController.addContactUs)

module.exports = contactUsRouter
