import express from 'express';
import { addNote, deleteNoteBydId, getNoteById, getNotes, updateNoteById } from './../controllers/notesController.js';


const router = express.Router();

router.get('/', getNotes);
router.post('/', addNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNoteById);
router.delete('/:id', deleteNoteBydId)

export default router;