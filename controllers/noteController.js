const noteModel = require('../models/noteModel')

module.exports = {
    addNote: async (req, res) => {
        try {
            const { userId } = req.params
            const noteData = new noteModel(req.body)
            noteData.userId = userId
            await noteData.save()
            res.status(201).send({
                success: true,
                message: "Note Added Successfully",
                data: noteData
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
