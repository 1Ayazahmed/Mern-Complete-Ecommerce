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

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    // delete images from cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Delete product from mongodb
    await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      existingImages,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let updatedImages = [];

    // Keep Selected Old Images
    if (existingImages) {
      const keepId = JSON.parse(existingImages);
      updatedImages = product.productImg.filter((img) =>
        keepId.includes(img.public_id)
      );
      // delete only removed images from cloudinary

      const removedImages = product.productImg.filter(
        (img) => !keepId.includes(img.public_id)
      );
      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImages = product.productImg; // Keep all If Nothing Sent
    }

    // upload new images if any
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products",
        });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    // update product details
    product.productName = productName || product.productName;
    product.productDescription =
      productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.productImg = updatedImages;

    await product.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Product updated successfully",
        product,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
