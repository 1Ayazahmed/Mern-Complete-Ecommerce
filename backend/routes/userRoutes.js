import express from "express";
import { registerUser,verifyToken } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyToken);


export default router;
