import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Edit, Search, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import ImageUpload from "@/components/ImageUpload";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const filteredProducts = (products || [])
    .filter((product) =>
      (product.productName || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return (a.productPrice || 0) - (b.productPrice || 0);
      if (sortOrder === "highToLow") return (b.productPrice || 0) - (a.productPrice || 0);
      return 0;
    });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editProduct?._id) return;

    const formData = new FormData();
    formData.append("productName", editProduct.productName || "");
    // Send the correct key expected by backend and stored in DB
    formData.append(
      "productDescription",
      editProduct.productDescription ||
        editProduct.productDesc ||
        editProduct.description ||
        ""
    );
    formData.append("productPrice", editProduct.productPrice ?? 0);
    formData.append("category", editProduct.category || "");
    formData.append("brand", editProduct.brand || "");

    const existingImages = (editProduct.productImg || [])
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    (editProduct.productImg || [])
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("images", file);
      });

    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success) {
        toast.success("Product Updated Successfully");
        const updatedProducts = (products || []).map((p) =>
          p._id === editProduct._id ? res.data.product : p
        );
        dispatch(setProducts(updatedProducts));
      } else {
        toast.error(res.data?.message || "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]:
        name === "productPrice"
          ? Number(value)
          : value,
    }));
  };

  return (
    <div className="ml-[300px] min-h-screen bg-[#161616] text-white py-12 px-10 w-[calc(100%-300px)] mt-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
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
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            className="bg-[#1f1f1f] border border-gray-700 p-4 rounded-lg hover:shadow-md transition"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.productImg?.[0]?.url}
                  alt={product.productName}
                  className="w-20 h-20 object-contain bg-[#2a2a2a] rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.productName}</h2>
                  <p className="text-sm text-gray-400">Rs {product.productPrice}</p>
                </div>
              </div>

              {/* Description on card */}
              <p className="text-sm text-gray-400 line-clamp-3">
                {product.productDescription ||
                  product.productDesc ||
                  product.description ||
                  "No description available."}
              </p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <Dialog onOpenChange={(open) => !open && setEditProduct(null)}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditProduct(product)}
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-4xl bg-[#1f1f1f] text-white border border-gray-700">
                    <form onSubmit={handleSave}>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Update product details below.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="productName">Product Name</Label>
                          <Input
                            id="productName"
                            name="productName"
                            value={editProduct?.productName ?? ""}
                            onChange={handleDialogChange}
                            className="bg-[#2a2a2a] border border-gray-600 text-white"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="productPrice">Price</Label>
                          <Input
                            id="productPrice"
                            name="productPrice"
                            type="number"
                            value={
                              editProduct?.productPrice !== undefined
                                ? editProduct.productPrice
                                : ""
                            }
                            onChange={handleDialogChange}
                            className="bg-[#2a2a2a] border border-gray-600 text-white"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            name="brand"
                            value={editProduct?.brand ?? ""}
                            onChange={handleDialogChange}
                            className="bg-[#2a2a2a] border border-gray-600 text-white"
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            name="category"
                            value={editProduct?.category ?? ""}
                            onChange={handleDialogChange}
                            className="bg-[#2a2a2a] border border-gray-600 text-white"
                          />
                        </div>

                        <div className="md:col-span-2 grid gap-2">
                          <Label htmlFor="productDescription">Description</Label>
                          <Textarea
                            id="productDescription"
                            name="productDescription"
                            value={
                              editProduct?.productDescription ??
                              editProduct?.productDesc ??
                              editProduct?.description ??
                              ""
                            }
                            onChange={handleDialogChange}
                            rows={8}
                            className="bg-[#2a2a2a] border border-gray-600 text-white"
                          />
                        </div>
                      
                            {editProduct && <ImageUpload productData={editProduct} setProductData={setEditProduct}/>}

                   
                        <div className="md:col-span-2 grid gap-2">
                          <Label>Image Preview</Label>
                          <img
                            src={editProduct?.productImg?.[0]?.url}
                            alt="preview"
                            className="w-full h-48 object-contain bg-[#2a2a2a] rounded-md"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Trash2 className="cursor-pointer text-red-500 hover:text-red-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;