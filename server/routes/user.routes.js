import {Router} from "express"
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateProfile } from "../controllers/user.controller.js";
import {isLoggedIn} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post('/register',upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:reset-token', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);
router.post('/update-me', isLoggedIn, upload.single("avatar"), updateProfile);


export default router;