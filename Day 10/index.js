import express from 'express';
import authRoutes from './routes/auth.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import notesRoutes from './routes/notesRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import uploadRouter from './routes/upload.js';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err));

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/upload', uploadRouter);
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
});