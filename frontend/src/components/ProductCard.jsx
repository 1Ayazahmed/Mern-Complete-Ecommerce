import React from 'react'
import { Skeleton } from './ui/skeleton';

const ProductCard = ({ product, loading }) => {
  const { productName, productDescription, productPrice, productImg } = product;

  return (
    <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg p-5 hover:border-green-500 hover:scale-[1.02] transition-transform">
      {/* Image */}
      <div className="h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {loading ? (
          <Skeleton className="h-48 w-full rounded-lg animate-pulse" />
        ) : (
          <img
            className="object-cover h-full w-full rounded-lg"
            src={productImg[0]?.url}
            alt={productName}
          />
        )}
      </div>

      {/* Product Name */}
      {loading ? (
        <Skeleton className="h-6 w-3/4 mb-2 animate-pulse" />
      ) : (
        <h3 className="text-white font-semibold text-lg">{productName}</h3>
      )}

      {/* Description */}
      {loading ? (
        <Skeleton className="h-4 w-full mb-2 animate-pulse" />
      ) : (
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {productDescription}
        </p>
      )}

      {/* Price */}
      {loading ? (
        <Skeleton className="h-6 w-20 mt-3 mb-2 animate-pulse" />
      ) : (
        <p className="text-green-400 font-bold mt-3 text-lg">${productPrice}</p>
      )}

      {/* Button */}
      {loading ? (
        <Skeleton className="h-10 w-full mt-4 rounded-lg animate-pulse" />
      ) : (
        <button className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-medium">
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default ProductCard
