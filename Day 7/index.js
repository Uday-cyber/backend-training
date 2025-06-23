import express from 'express';
import notesRouter from './routes/notesRoutes.js';
import 'dotenv/config';
import errorHandler from './middleware/errorHandler.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err));

app.use('/notes', notesRouter);
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
})

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`Server is running on port number ${PORT}`);
});
