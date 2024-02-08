import React from "react";
import ProductCard from "../card/ProductCard";

function ProductsList({ products }) {
  
  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product) => {
          return <ProductCard key={product.productId} data={product} />;
        })}
      </div>
    </>
  );
}

export default ProductsList;
