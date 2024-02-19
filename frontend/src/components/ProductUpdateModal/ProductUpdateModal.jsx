// ChatModal.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "react-modal";

const ProductUpdateModal = ({ isOpen, onRequestClose, product, onAction }) => {
  console.log(product)

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [formData, setFormData] = useState({
    productName: product.productName,
    productDescription: product.productDescription,
    dueDate: product.dueDate,
    productPrice: product.productPrice,
  });

  const focusedStyling = "border-4 border-O opacity-50";

  const handleChange = (e) => {
    console.log();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/update/${product.productId}`,
        formData,
        { withCredentials: true }
      );

      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      onAction();
    }
  };

  const scrollRight = () => {
    setFocusedIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return 3; //last index of image array
    });
  };

  const scrollLeft = () => {
    setFocusedIndex((prev) => {
      if (prev < 3) {
        return prev + 1;
      }
      return 0; //first index of image array
    });
  };

  const shiftFocus = (index) => {
    setFocusedIndex(index);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product edit modal"
      className="w-11/12 h-[85vh] m-auto mt-20 bg-slate-200 p-4 md:w-1/2 md:ml-80 lg:w-[40vw] lg:ml-[35vw] rounded-xl overflow-y-auto"
    >
      <div className="flex justify-between">
        <h2 className="inline-block">Update and List product</h2>
        <button onClick={onRequestClose}>close</button>
      </div>

      <div className="min-w-3 mt-6">
      <section className="flex flex-col gap-4 p-5 md:w-full lg:gap-4 justify-center items-center select-none">
          <div className="whitespace-nowrap snap-x snap-mandatory overflow-y-hidden rounded-3xl shadow-2xl shadow-orange-300 w-full max-w-96 md:max-w-none">
            <div className="relative flex justify-center h-72 md:h-96 snap-center border-t-2 rounded-3xl">
              <img
                className="h-full w-full max-w-96 md:max-w-none object-cover  rounded-3xl hover:object-scale-down"
                src={product.productImages[focusedIndex].secure_url}
                alt="Product"
              />
              <div className="absolute top-1/2 flex justify-between w-full px-2 md:hidden">
                <span
                  className="aspect-square w-8 flex items-center justify-center bg-white opacity-50 rounded-full"
                  onClick={scrollRight}
                >
                  <img
                    src="/images/icon-previous.svg"
                    alt="next button"
                    className="w-2"
                  />
                </span>
                <span
                  className="aspect-square w-8 flex items-center justify-center bg-white opacity-50 rounded-full"
                  onClick={scrollLeft}
                >
                  <img
                    src="/images/icon-next.svg"
                    alt="previous button"
                    className="w-2"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-between max-w-full">
            {product.productImages.map((image, index) => (
              <img
                key={index}
                src={image.secure_url}
                className={`aspect-square w-1/4 p-1 rounded-3xl ${
                  focusedIndex === index ? focusedStyling : ""
                } cursor-pointer hover:opacity-60`}
                alt={`Product thumbnail ${index}`}
                tabIndex={index}
                onFocus={() => {
                  shiftFocus(index);
                }}
              />
            ))}
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              className="h-10 p-4 block border border-gray-300 rounded-lg"
              type="text"
              id="productName"
              name="productName"
              maxLength={40}
              value={formData.productName}
              onChange={handleChange}
              placeholder="Asset Name"
              required
            />
          </div>

          <div className="mt-3">
            <label htmlFor="dueDate">Due Date</label>
            <input
              className="h-10 p-4 block border border-gray-300 rounded-lg"
              type="date"
              id="tillDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              min={
                new Date().toISOString().split("T")[0]
              } /* Set min to today's date*/
            />
          </div>

          <div className="mt-3">
            <label htmlFor="productPrice">Price</label>
            <input
              className="h-10 p-4 block border border-gray-300 rounded-lg"
              type="number"
              id="price"
              name="productPrice"
              value={formData.productPrice}
              onChange={handleChange}
              min={1}
              placeholder="price per day"
              required
            />
          </div>

          <div className="mt-3 max-h-96">
            <label htmlFor="productDescription">Description</label>
            <textarea
              className="h-15 w-full resize-y px-4 py-2 border border-gray-300 rounded-lg"
              id="description"
              name="productDescription"
              maxLength={180}
              value={formData.productDescription}
              onChange={handleChange}
              placeholder="Write product description in max 180 letters"
              required
            />
          </div>

          <div className="mt-3">
            <p>Product category: <span className="font-semibold">{product.productCategory}</span></p> 
          </div>

          <div className="mt-3">
         <p>Tags: <span className="font-semibold">{product.productTags.join(", ")}</span></p>   
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 h-8 w-24 bg-blue-400 active:bg-blue-800 text-white rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductUpdateModal;
