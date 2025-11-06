import mongoose, { mongo } from "mongoose";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Notes = mongoose.model('Notes', notesSchema);
export default Notes;