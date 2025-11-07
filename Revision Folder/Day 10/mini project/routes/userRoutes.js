import express from 'express';

import { uploadProfile } from '../controllers/userController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/uploadProfile', upload.single('userProfile'), uploadProfile);

export default router;