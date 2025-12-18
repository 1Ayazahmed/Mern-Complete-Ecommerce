import React, { useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { toast } from "sonner";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async () => {
    try {
        setLoading(true);
      const res = await axios.get(
        'http://localhost:3000/api/v1/product/getallproducts'
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error, "Failed to fetch products. Please try again.");
    } finally{
        setLoading(false);
    }
  };

useEffect(()=>{
getAllProducts();
},[])

console.log(allProducts);

  return (
    <div className="pt-20 pb-20 bg-[#161616] min-h-screen text-white">
      <div className="mt-20 max-w-7xl mx-auto px-4 flex gap-7">
        {/* Filter Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Product Cards Right Section */}
        <div className="flex-1 flex flex-col">
          {/* Sort Dropdown */}
          <div className="flex justify-end items-center mb-6">
            <Select>
              <SelectTrigger className="w-[220px] bg-[#1f1f1f] border border-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-[#1f1f1f] border border-gray-700 text-gray-300 w-[220px]">
                <SelectGroup>
                  <SelectLabel className="text-green-400">
                    Sort by Price
                  </SelectLabel>
                  <SelectItem
                    value="lowToHigh"
                    className="cursor-pointer hover:bg-green-600 hover:text-white"
                  >
                    Price: Low To High
                  </SelectItem>
                  <SelectItem
                    value="highToLow"
                    className="cursor-pointer hover:bg-green-600 hover:text-white"
                  >
                    Price: High To Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {allProducts.map((product) => {
            return <ProductCard key={product._id} product={product} loading={loading} />;
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
