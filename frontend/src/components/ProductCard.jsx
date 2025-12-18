import React from 'react'

const ProductCard = () => {
  return (
   <>
         {/* Product Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> */}
            {/* Product Card 1 */}
            <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl shadow-lg p-5 hover:border-green-500 hover:scale-[1.02] transition-transform">
              <div className="h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <span className="text-gray-500">Image</span>
              </div>
              <h3 className="text-white font-semibold text-lg">Product Name</h3>
              <p className="text-gray-400 text-sm mt-1">Short description here...</p>
              <p className="text-green-400 font-bold mt-3 text-lg">$29.99</p>
              <button className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-medium">
                Add to Cart
              </button>
            </div>
          {/* </div> */}
   </>
  )
}

export default ProductCard