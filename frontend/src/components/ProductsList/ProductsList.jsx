import React, {useState} from "react";
import ProductCard from "../card/ProductCard";
import ProductUpdateModal from "../ProductUpdateModal/ProductUpdateModal";

function ProductsList({ products, isEditable, isDeletable, onAction }) {
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const openEditModal = (e, data) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product) => {
          return <ProductCard key={product.productId} data={product} isEditable={isEditable} isDeletable={isDeletable} onAction={onAction} openEditModal={openEditModal} closeEditModal={closeEditModal} isEditModalOpen={isEditModalOpen}/>;
        })}
      </div>
    </>
  );
}

export default ProductsList;
