const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path');

const userModel = require('../models/userModel')
const emailService = require('../services/emailService')

module.exports = {
    // Register User API
    registerUser: async (req, res) => {
        try {
            const userData = new userModel(req.body)
            const isUserExist = await userModel.findOne({
                userName: req.body.userName
            })
            const isUserEmailExist = await userModel.findOne({
                userEmail: req.body.userEmail
            })
            if (isUserExist || isUserEmailExist) {
                return res.status(400).send({
                    success: false,
                    message: "User Already Exist"
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.userPassword, 10)
            userData.userPassword = hashedPassword
            await userData.save()
            res.sendFile(path.join(__dirname, '..', 'views', 'noteDashboard.html'));
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
            const { userAccount, userPassword } = req.body;
            const isUserExistWithEmail = await userModel.findOne({ userEmail: userAccount });
            const isUserExistWithUserName = await userModel.findOne({ userName: userAccount });
            const userData = isUserExistWithEmail || isUserExistWithUserName;
            if (!userData) {
                return res.status(404).json({
                    success: false,
                    message: "User Does Not Exist"
                });
            }
            const isPasswordCorrect = await bcrypt.compare(userPassword, userData.userPassword);
            if (!isPasswordCorrect) {
                return res.status(401).json({
                    success: false,
                    message: "Incorrect Password"
                });
            }
            const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                success: true,
                message: "User Logged In Successfully",
                token: token
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error",
                error: error.message
            });
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
            const token = jwt.sign({ isEmailExist }, process.env.SECRET_KEY, { expiresIn: '1h' }); // I will do it later
            await emailService.mailOptions(userEmail)
            res.sendFile(path.join(__dirname, '..', 'views', 'forgetPasswordNote.html'));
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

    // Edit Profile API
    editProfile: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { userName } = req.body;
            const userProfilePic = req.file ? `/upload/userProfile/${req.file.filename}` : undefined;
            const updateUserData = await userModel.findByIdAndUpdate(
                userId,
                {
                    userProfilePic: userProfilePic || undefined,
                    userName: userName || undefined,
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "User profile updated",
                updatedData: updateUserData
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    }
}
