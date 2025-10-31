import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './routes/Todoroutes.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {console.log('Connected to MongoDB');})
.catch((err) => {console.error('Error connecting to MongoDB', err);});

app.get('/', (req, res) => {
    res.send('MongoDB connection successful');
});

const PORT = process.env.PORT || 3000;

app.use('/todos', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});