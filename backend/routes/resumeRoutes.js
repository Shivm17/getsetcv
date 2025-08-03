import express from 'express';
import { createResume, deleteResume, getResume, getResumeById, updateResume } from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';
import { protect } from '../middleware/authMiddleware.js';

const resumeRouter = express.Router();


resumeRouter.post('/',protect,createResume)

resumeRouter.get('/', protect, getResume);

resumeRouter.get('/:id', protect, getResumeById);

resumeRouter.put('/:id', protect, updateResume);

resumeRouter.put('/:id/upload-images', protect, uploadResumeImages);

resumeRouter.delete('/:id', protect, deleteResume);

export default resumeRouter;
