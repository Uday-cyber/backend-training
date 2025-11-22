import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: [true, 'Title is required']
    },

    description: {
        type: String,
        required: [true, 'Description is required']
    },

    file: {
        type: String,
    },

    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

TaskSchema.index({ title: "text", description: "text" });
TaskSchema.index({ status: 1 });
TaskSchema.index({ createdAt: -1 });

const Task = mongoose.model('Task', TaskSchema);
export default Task;