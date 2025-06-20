import express from 'express';
import noteRoutes from './routes/notes.js';
import logger from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(express.json());
app.use('/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})