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
    isActive: {
        type: Boolean,
        default: true
    }
})

userSchema.set("timestamps", true)

module.exports = mongoose.model("note", noteModel)
