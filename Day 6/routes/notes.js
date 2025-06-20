import express from 'express';
import { getNotes, addNote, getNoteById, updateNote, deleteNote } from '../controllers/notesController.js'

const router = express.Router();

router.get('/', getNotes);
router.post('/', addNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;