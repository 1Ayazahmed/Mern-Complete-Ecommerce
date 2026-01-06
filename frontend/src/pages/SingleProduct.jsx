import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductBreadcrumb from "@/components/ProductBreadcrumb.jsx"
import ProductDec from "@/components/ProductDec.jsx";
import ProductImg from "@/components/ProductImg.jsx";


const SingleProduct = () => {
  const params = useParams();
  const productId = params.id;
//   const { products } = useSelector(store => store.product);
    const products = useSelector((store) => store.products?.products);
  
  const product = products.find((item) => item._id === productId);
  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto bg-[#161616]">
      <ProductBreadcrumb  product={product} />
      <div className="mt-10 grid grid-cols-2 items-center">
        <ProductImg images={product.productImg} />
        <ProductDec product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;