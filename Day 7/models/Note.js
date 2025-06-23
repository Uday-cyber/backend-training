import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Title must be atleast 3 characters"]
    },
    message: {
        type: String,
        required: [true, "Body is required"],
        maxLength: [500, "Body must be under 500 characters"]
    }
}, { timestamps: true });

const Note = mongoose.model("Note", NoteSchema);
export default Note;