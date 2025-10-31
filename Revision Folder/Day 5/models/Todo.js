import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);