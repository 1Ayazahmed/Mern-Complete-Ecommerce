import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.productPrice - b.productPrice;
      if (sortOrder === "highToLow") return b.productPrice - a.productPrice;
      return 0;
    });

  return (
    <div className="ml-[300px] min-h-screen bg-[#161616] text-white py-12 px-10 w-[calc(100%-300px)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Search */}
        <div className="relative w-[400px]">
          <Input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2a2a2a] border border-gray-600 text-white pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
        </div>

        {/* Sort */}
        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[200px] bg-[#2a2a2a] border border-gray-600 text-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] text-white border border-gray-600">
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <Card
            key={index}
            className="bg-[#1f1f1f] border border-gray-700 p-4 rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.productImg[0]?.url}
                alt={product.productName}
                className="w-20 h-20 object-contain bg-[#2a2a2a] rounded-md"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <p className="text-sm text-gray-400">Rs {product.productPrice}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;
