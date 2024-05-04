const express = require('express')

const noteController = require('../controllers/noteController')
const { noteImageUpload } = require('../middleware/noteStorage')

const noteRouter = express.Router()

noteRouter.post('/addNote/:userId', noteController.addNote)
noteRouter.patch('/updateNote/:noteId', noteImageUpload.single('noteImage'), noteController.updateNote)
noteRouter.delete('/deleteNote/:noteId', noteController.deleteNote)

module.exports = noteRouter
