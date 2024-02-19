import React, { useState } from "react";
import ProductCard from "../card/ProductCard";
import ProductUpdateModal from "../ProductUpdateModal/ProductUpdateModal";
import toast from "react-hot-toast";
import axios from "axios";

function ProductsList({ products, isEditable, isDeletable, onAction }) {
  const [editProductId, setEditProductId] = useState(null);

  const openEditModal = (e, productId) => {
    e.stopPropagation();
    setEditProductId(productId);
  };

  const closeEditModal = () => {
    setEditProductId(null);
  };

  const handleDelete = async(e, productId) => {
    e.stopPropagation(); // Stop event propagation to prevent navigation
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/product/delete/${productId}`);

        toast.success(response.data.message, {id: toastId});
    } catch (error) {
      toast.error(error.response.data.message, {id: toastId})
    }
    finally{
      onAction();
    }
  }


  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            isEditable={isEditable}
            isDeletable={isDeletable}
            handleEdit={openEditModal}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      {editProductId && (
        <ProductUpdateModal
          isOpen={true}
          onRequestClose={closeEditModal}
          product={products.find((product) => product.productId === editProductId)}
          onAction={onAction}
        />
      )}
    </>
  );
}

export default ProductsList;
