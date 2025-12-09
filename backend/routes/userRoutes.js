import express from "express";
import { registerUser,verifyToken,reVerifyEmail,login,logout, forgotPassword,verifyOTP,changePassword,allUsers,getUserById} from "../controllers/userController.js";
import { isAuthenticated} from "../middleware/isAuthenticate.js";
import { isAdmin } from "../middleware/isAuthenticate.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyToken);
router.post("/reverify", reVerifyEmail);
router.post("/login", login);
router.post("/logout",isAuthenticated ,logout);
router.post("/forgot-password",forgotPassword);
router.post("/verify-otp/:email",verifyOTP);
router.post("/change-password/:email",changePassword);
router.get("/all-users",isAuthenticated,isAdmin ,allUsers)
router.get("/get-user/:userId",getUserById)





export default router;
