import Note from "../models/Note.js";

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    if (notes.length === 0) {
      res.status(404).json({ error: "Notes not found" });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
