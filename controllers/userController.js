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
}
