import express from 'express';
import { addNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', addNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;