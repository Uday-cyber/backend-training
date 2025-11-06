import express from 'express';

import { registerUser, getUsers, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getUsers);

export default userRouter;