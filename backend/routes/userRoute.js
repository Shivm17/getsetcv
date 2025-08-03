import express from 'express';
import { contactUs, getUserDetails, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// This route is for user registration
userRouter.post('/register', registerUser);

// This route is for user login
userRouter.post('/login', loginUser);

//on this route first the go in the middleware and then if token was verified then go to the controller that gives user details
userRouter.get('/profile', protect, getUserDetails);
userRouter.post('/contact-us', contactUs);


export default userRouter;