import express from "express";
import { registerUser,verifyToken,reVerifyEmail } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyToken);
router.post("/reverify", reVerifyEmail);



export default router;
