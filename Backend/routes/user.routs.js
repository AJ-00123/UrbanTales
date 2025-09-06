import express from "express";
import { signup, login, updateProfile, googleFirebaseLogin } from "../controllers/User.Controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Manual authentication
router.post("/signup", signup);
router.post("/login", login);

// Firebase Google authentication
router.post("/google-firebase", googleFirebaseLogin);

// Profile update (protected)
router.put("/profile", verifyToken, updateProfile);

export default router;
