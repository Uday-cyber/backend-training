import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userProfile: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userProfile = mongoose.model('UserProfile', userSchema);
export default userProfile;