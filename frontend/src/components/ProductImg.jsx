import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0]?.url);

  return (
    <div className="flex gap-6 w-max bg-[#161616] p-4 rounded-xl">
      {/* Thumbnail List */}
      <div className="flex flex-col gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setMainImg(img.url)}
            className="cursor-pointer w-20 h-20 object-cover border border-gray-700 rounded-lg shadow-md hover:border-green-500 transition-all"
          />
        ))}
      </div>

      {/* Main Image */}
      <div>
  <Zoom>
  <img
    src={mainImg}
    alt="Main Product"
    className="w-[500px] h-auto object-cover border border-gray-700 rounded-xl shadow-lg"
  />
</Zoom>

      </div>
    </div>
  );
};

export default ProductImg;
