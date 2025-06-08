import express from 'express';
import { requireAuth } from '@clerk/express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.use(requireAuth()); //clerk middleware to protect routes

//we need the clerkId to identify the user, so we can use clerk's middleware to get the user info

router.post('/create-user',createUser);
router.get('/get-user',getUser);
router.put('/update-user',updateUser);
router.delete('/delete-user',deleteUser);

export default router;