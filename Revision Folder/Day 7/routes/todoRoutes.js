import express from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/todoController.js';
import protect from '../middleware/userAuth.js';

const todoRouter = express.Router();

todoRouter.post('/', protect, createTodo);
todoRouter.get('/', protect, getTodos);
todoRouter.get('/:id', protect, getTodoById);
todoRouter.put('/:id', protect, updateTodo);
todoRouter.delete('/:id', protect, deleteTodo);

export default todoRouter;