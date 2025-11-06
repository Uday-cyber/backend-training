import Notes from "../models/notes.js";

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if(!title || !content) {
            return res.status(400).json({ error: 'Title and Content are required' });
        }

        const userId = req.user && (req.user._id || req.user);
        if(!userId) return res.status(401).json({ error: 'Unauthorized' });

        const newNote = new Notes ({ title, content, user: userId });
        await newNote.save();
        res.status(201).json(newNote);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getNotes = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user);
        if(!userId) return res.status(401).json({ error: 'Unauthorized' });

        const notes = await Notes.find({ user: userId });
        if(!notes || notes.length === 0) {
            return res.status(200).json({ message: 'No notes found' });
        }

        res.status(200).json(notes);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user);
        if(!userId) return res.status(401).json({ error: 'Unauthorized' });

        const noteId = await Notes.findById(req.params.id);
        if(!noteId) {
            return res.status(404).json({ error: 'Note not found' });
        }

        if(noteId.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.status(200).json(noteId);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user)
        if(!userId) return res.status(401).json({ error: 'Unauthorized' });
        
        const updateNote = await Notes.findByIdAndUpdate(
            { _id: req.params.id, user: userId },
            { ...req.body },
            { new : true }
        );
        if(!updateNote) {
            return res.status(404).json({ error: 'Note not found or access denied' });
        }

        res.status(200).json(updateNote);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const userId = req.user && (req.user._id || req.user);
        if(!userId) return res.status(401).json({ error: 'Unauthorized' });

        await Notes.findByIdAndDelete({ _id: req.params.id, user: userId });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}