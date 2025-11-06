import express from "express";

import protect from "../middlewares/userAuth.js";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/noteController.js";


const noteRouter = express.Router();

noteRouter.post('/', protect, createNote);
noteRouter.get('/', protect, getNotes);
noteRouter.get('/:id', protect, getNoteById);
noteRouter.put('/:id', protect, updateNote);
noteRouter.delete('/:id', protect, deleteNote);

export default noteRouter;