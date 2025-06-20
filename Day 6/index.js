import mongoose from "mongoose";
import 'dotenv/config';
import noteRoutes from './routes/notes.js';
import express from 'express';

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error: ", err));

app.use('/notes', noteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port number: ${PORT}`);
})