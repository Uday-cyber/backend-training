import mongoose from "mongoose";
import Note from "../models/Note.js";

export const getNotes = async (req, res, next) => {
    try{
        const { search, page = 1, limit = 10, sort = "createdAt" } = req.query;
        const query = {};

        query.user = req.user._id;

        if(search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { body: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);


        const notes = await Note.find(query)
        .sort({ [sort]: -1 })
        .skip(skip)
        .limit(parseInt(limit));

        const total = await Note.countDocuments(query);

        res.json({
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: notes
        });
        
    } catch(err){
        next(err);
    }
}

export const addNote = async (req, res, next) => {
    try{
        const data = { ...req.body, user: req.user._id};
        if(req.file) {
            data.file = `/uploads/${req.file.filename}`;
        }

        const note = await Note.create(data);
        res.status(201).json(note);
    } catch(err){
        next(err);
    }
}

export const getNoteById = async (req, res, next) => {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid note ID" });
        }
        const note = await Note.findById(req.params.id);
        if(!note) { return res.status(404).json({ error: "Note not found" }); }
        else{ res.json(note); }
    } catch(err) {
        next(err);
    }
}

export const updateNote = async (req, res, next) => {
    try{
        const note = await Note.findByIdAndUpdate(req.params.id, req.body);
        if(!note) { return res.status(404).json({ error: "Note not found" }); }
        else { res.json(note); }
    } catch(err) {
        next(err);
    }
}

export const deleteNote = async (req, res, next) => {
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Note deleted successfully"});
    } catch(err) {
        next(err);
    }
}