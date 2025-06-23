import Note from '../models/Note.js';
import mongoose from 'mongoose';

export const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        if(notes.length === 0) { res.status(404).json({ message: "Notes not found" }); }
        else{ res.json(notes); }
    } catch (error) {
        next(error);
    }
}

export const addNote = async (req, res, next) => {
    try {
        const notes = await Note.create(req.body);
        res.status(201).json(notes);
        // res.json(notes);
    } catch (error) {
        next(error); 
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid note ID" });
        }
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({ message: "Note not found"});
        }
        else{
            res.json(note);
        }
    } catch (error) {
        next(error); 
    }
}

export const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if(!note){
            return res.status(404).json({ message: "Note not found"});
        }
        else{
            res.json(note);
        }
    } catch (error) {
        next(error); 
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: "Note deleted successfully"});
    } catch (error) {
        next(error); 
    }
}
