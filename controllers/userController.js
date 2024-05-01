const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')
const emailService = require('../services/emailService')

module.exports = {
    // Register User API
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserExist = await userModel.findOne({
                userEmail: req.body.userEmail
            })
            if (isUserExist) {
                return res.status(400).send({
                    success: false,
                    message: "User Already Exist"
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
            userData.userPassword = hashedPassword
            await userData.save()
            res.status(202).send({
                success: true,
                message: "User Registered Successfully"
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },

    // Login User API
    loginUser: async (req, res) => {
        try {
            const { userEmail, userPassword } = req.body
            const isUserExist = await userModel.findOne({
                userEmail: userEmail
            })
            if (!isUserExist) {
                return res.status(404).send({
                    success: false,
                    message: "User Does Not Exist"
                })
            }
            const isPasswordCorrect = await bcrypt.compare(userPassword, isUserExist.userPassword)
            if (!isPasswordCorrect) {
                return res.status(400).send({
                    success: false,
                    message: "Incorrect Password"
                })
            }
            const token = jwt.sign({ isUserExist }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({
                success: true,
                message: "User Logged In Successfully",
                token: token
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },

    // Forget Password API
    forgetPassword: async (req, res) => {
        try {
            const { userEmail } = req.body
            const isEmailExist = await userModel.findOne({
                userEmail: userEmail
            })
            if (!isEmailExist) {
                return res.status(404).send({
                    success: false,
                    message: "User not found!"
                })
            }
            const token = jwt.sign({ isEmailExist }, process.env.SECRET_KEY, { expiresIn: '1h' });
            await emailService.mailOptions(userEmail)
            res.status(200).send({
                success: true,
                message: "Email has been sended successfully",
                userId: isEmailExist._id,
                token: token,
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },

    // Set New Password API
    setNewPassword: async (req, res) => {
        try {
            const { userId, token } = req.params
            const { newPassword, confirmPassword } = req.body
            const userData = await userModel.findById(userId)
            const isTokenValid = await jwt.verify(token, process.env.SECRET_KEY)
            if (!isTokenValid) {
                return res.status(400).send({
                    success: false,
                    message: "Token Expired"
                })
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).send({
                    success: false,
                    message: "Passwords do not match"
                })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            userData.userPassword = hashedPassword
            await userData.save()
            res.status(200).send({
                success: true,
                message: "Password Changed Successfully"
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },
}
