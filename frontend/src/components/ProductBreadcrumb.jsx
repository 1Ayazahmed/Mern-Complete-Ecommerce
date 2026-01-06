import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";


const ProductBreadcrumb = ({ product }) => {
  // Don't render the breadcrumb until the product data is available.
  // if (!product) {
  //   return null;
  // }

  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
            className="cursor-pointer" 
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
            className="cursor-pointer" 

              onClick={() => {
                navigate("/product");
              }}
            >
              products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.productName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default ProductBreadcrumb;
