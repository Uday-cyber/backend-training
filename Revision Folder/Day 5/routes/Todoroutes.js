import express from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/TodoController.js';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getTodoById);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
