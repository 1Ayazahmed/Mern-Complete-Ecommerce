import React from "react";

const ImageUpload = () => {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-300">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        className="bg-[#2a2a2a] border border-gray-600 text-white file:text-white file:bg-green-600 file:border-none file:px-4 file:py-2 file:rounded-md cursor-pointer"
      />
    </div>
  );
};

export default ImageUpload;
