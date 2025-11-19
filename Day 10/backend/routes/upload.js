import express from "express";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post('/', upload.single('file'), (req, res) =>{
    res.status(201).json({
        message: "File uplloaded successfully",
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
    });
});

export default router;
