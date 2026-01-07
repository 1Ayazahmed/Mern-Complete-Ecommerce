import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setProducts } from "@/redux/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products); // <-- use products array
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0,
    productDesc: "",
    productImg: [],
    brand: "",
    category: "",
  });

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productDescription", productData.productDesc);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);

    if (productData.productImg.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(setProducts(res.data.products)); // use Redux action
        toast.success(res.data.message);
        setProductData({
          productName: "",
          productPrice: 0,
          productDesc: "",
          productImg: [],
          brand: "",
          category: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="ml-[300px] bg-[#161616] min-h-screen text-white py-12 px-10 w-[calc(100%-300px)] mt-12"
    >
      {/* Title & Subtitle */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Add Product</h1>
        <p className="text-gray-400 text-sm mt-1">Enter Product Details below</p>
      </div>

      {/* Full Width Form */}
      <div className="space-y-6 w-full">
        {/* Inputs */}
        <div>
          <label className="block mb-2 text-sm text-gray-300">Product Name</label>
          <Input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            className="bg-[#2a2a2a] border border-gray-600 text-white cursor-pointer w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Price</label>
          <Input
            type="number"
            name="productPrice"
            value={productData.productPrice}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="bg-[#2a2a2a] border border-gray-600 text-white cursor-pointer w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Brand</label>
          <Input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            placeholder="Enter brand name"
            required
            className="bg-[#2a2a2a] border border-gray-600 text-white cursor-pointer w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Category</label>
          <Input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            className="bg-[#2a2a2a] border border-gray-600 text-white cursor-pointer w-full"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm text-gray-300">Description</label>
          <Textarea
            name="productDesc"
            value={productData.productDesc}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Enter product description"
            className="bg-[#2a2a2a] border border-gray-600 text-white cursor-pointer w-full"
          />
        </div>

        {/* Image Upload */}
        <div>
          <ImageUpload
            productData={productData}
            setProductData={setProductData}
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            disabled={loading}
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg cursor-pointer w-full"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin w-4 h-4" />
                Please Wait
              </span>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;