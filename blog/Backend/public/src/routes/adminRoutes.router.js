import express from 'express';
import { adminLogin, userLogout, checkAdminAuth } from '../controllers/adminController.js';
import { verifyJwt } from '../middleware/jwtVerify.middleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/logout', userLogout);
router.get('/check', verifyJwt, checkAdminAuth); // ✅ This is the key route

export default router;
