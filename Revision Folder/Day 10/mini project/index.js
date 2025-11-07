import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/userRoutes.js';

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

const PORT = process.env.PORT || 4000;

app.use('/users', userRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
