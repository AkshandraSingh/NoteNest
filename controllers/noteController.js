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

    updateNote: async (req, res) => {
        try {
            const { noteId } = req.params
            const noteImage = req.file ? `/upload/productImages/${req.file.filename}` : undefined;
            const updatedNoteData = await noteModel.findByIdAndUpdate(noteId, {
                noteTitle: req.body.noteTitle || undefined,
                noteBody: req.body.noteBody || undefined,
                noteImage: noteImage || undefined,
            }, { new: true })
            res.status(200).send({
                success: true,
                message: "Note Updated Successfully",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },

    deleteNote: async (req, res) => {
        try {
            const { noteId } = req.params
            await noteModel.findByIdAndDelete(noteId)
            res.status(200).send({
                success: true,
                message: "Note Deleted Successfully",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    },

    viewNotes: async (req, res) => {
        try {
            const { userId } = req.params
            const notes = await noteModel.find({ userId: userId })
            if (notes.length <= 0) {
                res.status(404).send({
                    success: false,
                    message: "No Notes Found"
                })
            }
            res.status(200).send({
                success: true,
                message: "Notes Fetched Successfully",
                data: notes
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Error",
                error: error.message
            })
        }
    }
}
