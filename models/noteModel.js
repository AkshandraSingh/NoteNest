const mongoose = require('mongoose')

const noteModel = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteBody: {
        type: String,
        required: true
    },
    noteImage: {
        type: String,
        default: "Not Provided"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

noteModel.set("timestamps", true)

module.exports = mongoose.model("note", noteModel)
