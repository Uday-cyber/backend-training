import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file: {
        type: String
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title should be minimum length of 3 characters"]
    },
    body: {
        type: String,
        required: [true, "Message body is required"],
        maxLength: [500, "Message should be max length of 500 characters"]
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
export default Note;