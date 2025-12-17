import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticate.js";
import { multipleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, multipleUpload, addProduct);
router.get("/getallproducts", getAllProducts);

export default router;
