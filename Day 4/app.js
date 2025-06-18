// Importing necessary modules
import express from 'express';
import notesRouter from './routes/notes.js';
import cors from 'cors';
import 'dotenv/config'; // Import dotenv to load environment variables

const app = express();

// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware to parse JSON bodies

app.use(express.json());
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the express.js server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});