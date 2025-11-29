import express from 'express';
import { protect } from '../middlewares/auth.js';
import { createTask, deleteTask, getAllTasks, taskStats, updateTask } from '../controllers/taskController.js';
import { upload } from '../middlewares/upload.js';
// import { cacheMiddleware } from '../middlewares/cacheMiddleware.js';

const taskRoute = express.Router();

taskRoute.post('/', protect, upload.single('file') ,createTask);
taskRoute.get('/', protect, getAllTasks);
taskRoute.put('/:id', protect, upload.single('file') ,updateTask);
taskRoute.delete('/:id', protect, deleteTask);
taskRoute.get('/stats', protect, taskStats);
// taskRoute.get('/', protect, cacheMiddleware, getAllTasks);

export default taskRoute;