const express = require('express')

const noteController = require('../controllers/noteController')
const { noteImageUpload } = require('../middleware/noteStorage')
const { authentication } = require('../middleware/authToken')

const noteRouter = express.Router()

noteRouter.use(authentication)

noteRouter.post('/addNote/:userId', noteController.addNote)
noteRouter.patch('/updateNote/:noteId', noteImageUpload.single('noteImage'), noteController.updateNote)
noteRouter.delete('/deleteNote/:noteId', noteController.deleteNote)
noteRouter.get('/viewNotes/:userId', noteController.viewNotes)

module.exports = noteRouter
