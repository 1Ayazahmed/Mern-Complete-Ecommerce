import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/cart/add",
        { productId },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Product Added To Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      // console.error(error);
      console.log(error);
      
    }
  };



  return (
    <div className="flex flex-col gap-5 bg-[#1f1f1f] p-6 rounded-xl border border-gray-700 shadow-lg max-w-3xl text-white h-auto">
      {/* Product Name */}
      <h1 className="font-bold text-4xl text-white">
        {product?.productName || "Product Name"}
      </h1>

      {/* Category & Brand */}
      <p className="text-gray-400 text-sm">
        {product?.category || "Category"} | {product?.brand || "Brand"}
      </p>

      {/* Price */}
      <h2 className="text-green-400 font-bold text-2xl">
        RS {product?.productPrice || "999"}
      </h2>

      {/* Description */}
      <p className="line-clamp-12 text-muted-foreground text-gray-300 text-sm leading-relaxed">
        {product?.productDesc ||
          "This product is crafted with premium materials and designed for durability and style. Perfect for everyday use with a sleek finish and reliable performance."}
      </p>

      {/* Quantity Selector */}
      <div className="flex gap-3 items-center w-[300px]">
        <p className="text-gray-300 font-semibold">Quantity:</p>
        <Input
          type="number"
          className="w-16 bg-[#2a2a2a] border border-gray-600 text-white"
          defaultValue={1}
          min={1}
        />
      </div>

      {/* Add to Cart Button */}
      <Button  onClick={() => addToCart(product._id)} className="bg-green-600 hover:bg-green-500 text-white w-max px-6 py-2 rounded-lg cursor-pointer">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDesc;
