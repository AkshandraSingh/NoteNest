const express = require('express')

const noteController = require('../controllers/noteController')

const noteRouter = express.Router()

noteRouter.post('/addNote/:userId', noteController.addNote)

module.exports = noteRouter
