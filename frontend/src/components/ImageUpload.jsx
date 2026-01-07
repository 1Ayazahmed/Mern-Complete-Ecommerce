import React from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => {
      const uploadImages = prev.productImg.filter((_, i) => i !== index);
      return { ...prev, productImg: uploadImages };
    });
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm text-gray-300">Upload Image</label>
      <input
        id="image-file"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="bg-[#2a2a2a] border border-gray-600 text-white 
                   file:text-white file:bg-green-600 file:border-none 
                   file:px-4 file:py-2 file:rounded-md cursor-pointer w-full"
      />

      {/* Image Preview Grid */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {productData.productImg.map((img, index) => {
            let preview;
            if (img instanceof File) {
              preview = URL.createObjectURL(img);
            } else if (typeof img === "string") {
              preview = img;
            } else if (img?.url) {
              preview = img.url;
            } else {
              return null;
            }

            return (
              <Card
                key={index}
                className="relative group overflow-hidden bg-[#1f1f1f] border border-gray-700 rounded-md"
              >
                <CardContent className="p-0 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="product"
                    className="w-full h-40 min-h-[160px] object-contain bg-[#1f1f1f] transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full 
                               opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
