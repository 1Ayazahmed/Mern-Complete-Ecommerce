import express from "express";
import { registerUser,verifyToken,reVerifyEmail,login,logout, forgotPassword} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyToken);
router.post("/reverify", reVerifyEmail);
router.post("/login", login);
router.post("/logout",isAuthenticated ,logout);
router.post("/forgot-password",forgotPassword);






export default router;
