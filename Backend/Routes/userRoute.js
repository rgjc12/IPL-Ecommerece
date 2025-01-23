import express from 'express';
import { loginUser, registerUser, updateTeam, adminLogin,userID} from '../Controllers/userControllers.js';
import protect from "../Middleware/protect.js";
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);   
router.post('/updateteam',protect,updateTeam); 
router.post('/adminlogin', adminLogin);
router.post('/userid',userID);
export default router;
