import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        minlength: 3
    },
    body: {
        type: String,
        required: true,
        maxlenght: 500
    }
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

export default Note;