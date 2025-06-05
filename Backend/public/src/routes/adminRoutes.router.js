// import { Router } from 'express';
// // import { registerAdmin, loginAdmin, isAdmin } from '../controllers/adminController.js';
// import { userManage } from '../controllers/AdminController/userManage.controller.js';
// import {blogPost} from  '../controllers/AdminController/Blog.controller.js';
// import { userLogin } from '../controllers/user.controller.js';
// import { adminLogin } from '../controllers/adminController.js';
// const adminRouter = Router();

// // adminRouter.post('/register', registerAdmin);
// // adminRouter.post('/login', loginAdmin);
// // adminRouter.get('/dashboard', isAdmin, (req, res) => {
// //   res.json({ message: 'Welcome to the admin dashboard!' });
// // });

// adminRouter.put("/blog/toggle/:id",blogPost)
// adminRouter.put("/ban/user/:userId",userManage)
// adminRouter.post("/login",adminLogin)

// export default adminRouter;








import express from 'express';
import { adminLogin, userLogout, checkAdminAuth } from '../controllers/adminController.js';
import { verifyJwt } from '../middleware/jwtVerify.middleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/logout', userLogout);
router.get('/check', verifyJwt, checkAdminAuth); // ✅ This is the key route

export default router;
