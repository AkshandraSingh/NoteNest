const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/userModel')

module.exports = {
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

    loginUser: async (req, res) => {
        try {
            const { userEmail, userPassword } = req.body
            const isUserExist = await userModel.findOne({
                userEmail: userEmail
            })
            if (!isUserExist) {
                return res.status(400).send({
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
}
