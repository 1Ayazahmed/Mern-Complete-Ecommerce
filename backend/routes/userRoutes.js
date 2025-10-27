import express from "express";
import { registerUser,verifyToken,reVerifyEmail,login } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyToken);
router.post("/reverify", reVerifyEmail);
router.post("/login", login);
// router.post("/logout", logout);





export default router;
