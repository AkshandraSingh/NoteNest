const express = require('express')

const userController = require('../controllers/userController')
const { profilePicUpload } = require('../middleware/userStorage')

const userRouter = express.Router()

userRouter.post('/registerUser', userController.registerUser)
userRouter.post('/loginUser', userController.loginUser)
userRouter.post('/forgetPassword', userController.forgetPassword)
userRouter.post('/setNewPassword/:userId/:token', userController.setNewPassword)
userRouter.patch('/editProfile/:userId', profilePicUpload.single('userProfilePic'), userController.editProfile)

module.exports = userRouter
