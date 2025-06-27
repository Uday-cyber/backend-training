import express from "express";
import protect from "../middleware/authMiddleware.js";
import { addNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/notesController.js";

const router = express.Router();

router.get('/', protect, getNotes);
router.post('/', protect, addNote);
router.get('/:id', protect, getNoteById);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;