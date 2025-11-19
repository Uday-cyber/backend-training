import express from 'express';
import { getUsers, loginUser, refreshToken, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js'
import { authorizeRole } from '../middlewares/authorizeRole.js';

const userRoute = express.Router();

userRoute.post('/register', registerUser);

userRoute.get('/', protect, authorizeRole("admin"), getUsers);

userRoute.post('/login', loginUser);

userRoute.post('/refresh', refreshToken);


export default userRoute;