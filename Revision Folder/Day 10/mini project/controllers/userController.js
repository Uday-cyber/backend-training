import UserProfile from '../models/usersProfile.js';

export const uploadProfile = async (req, res) => {
    try{
        // const { userProfile } = req.body;
        if(!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        const filePath = `/uploads/${req.file.filename}`;

        const user = await UserProfile.create({ userProfile: filePath });
        res.status(201).json({ message: "Profile uploaded successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}