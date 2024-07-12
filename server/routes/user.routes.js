import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getAll,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
} from "../controllers/user.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:reset-token", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put(
  "/update-me/:id",
  isLoggedIn,
  upload.single("avatar"),
  updateProfile
);
router.get("/get", isLoggedIn, authorizedRoles("ADMIN"), getAll);

export default router;
