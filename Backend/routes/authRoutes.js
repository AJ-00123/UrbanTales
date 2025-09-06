import express from "express";
import { googleFirebaseLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/google-firebase", googleFirebaseLogin);

export default router;
