import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (notes.length === 0) {
      res.status(404).json({ error: "Notes not found" });
    }
    else{
        res.json(notes);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ message: "Note created successfully" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    else{ res.json(note) };
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    else { res.json(note) };
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Note deleted successfully'});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
