import { Product } from "../model/productModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDescription, productPrice, category, brand } =
      req.body;
    const userId = req.user._id;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !category ||
      !brand
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // handle multiple image uploads
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const imgUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(imgUri, {
          folder: "products",
        });
        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required.",
      });
    }

    // create a product in DB
    const newProduct = await Product.create({
      userId,
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      productImg, // array of objects [{url,public_id},{url,public_id}]
    });
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found", products: [] });
    }
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
