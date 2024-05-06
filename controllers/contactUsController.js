const contactUsModel = require('../models/contactUsModel')

module.exports = {
    addContactUs: async (req, res) => {
        try {
            const contactUsData = new contactUsModel(req.body)
            await contactUsData.save()
            res.status(201).send({
                success: true,
                message: "Contact Us Form Submitted Successfully"
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message
            })
        }
    },

    viewContactUs: async (req, res) => {
        try {
            const contactUsData = await contactUsModel.find()
            res.status(200).send({
                success: true,
                message: "Contact Us Form Data Fetched Successfully",
                contactUsData: contactUsData
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message
            })
        }
    },
}
