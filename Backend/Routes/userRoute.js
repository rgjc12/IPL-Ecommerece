import express from 'express';
import { loginUser, registerUser, updateTeam } from '../Controllers/userControllers.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/updateteam', updateTeam); 

export default router;
