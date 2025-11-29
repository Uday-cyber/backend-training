import mongoose, { mongo } from "mongoose";

const cronLogsSchema = new mongoose.Schema({
    job: String,
    message: String,
    status: String,
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("CronLogs", cronLogsSchema);