import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routes/usersRoute.js';
import noteRouter  from './routes/notesRoute.js';
import protect  from './middlewares/userAuth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => { console.log('Connected to MongoDB'); })
.catch((err) => { console.error('Error connecting to MongoDB', err); });

app.get('/', (req, res) => {
    res.send('MongoDB connection successful');
});

const PORT = process.env.PORT || 3000;

app.use('/users', userRouter);
app.use('/notes', protect, noteRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});