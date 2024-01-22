import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.png";
import LoadingDots from "../../assets/loadingDots.gif";
import Resizer from 'react-image-file-resizer';
import toast from "react-hot-toast";
import "./AddOnRent.css";

const AddOnRent = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state=>state.auth.status);

  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productTags: "",
    productCategory: "",
    productDescription: "",
    dueDate: "",
    productPrice: "",
    productQuantity: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You are not logged in!");
      navigate("/login");
      return;
    }
  }, []);

  const {
    productName,
    productTags,
    productCategory,
    productDescription,
    dueDate,
    productPrice,
    productQuantity,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const resizeFile = (file) =>
    new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        550,
        550,
        'WEBP',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const backendUrl =
      process.env.REACT_APP_BACKEND_URL + "/api/product/add-product";
    try {
      const formDataToSend = new FormData();

      // Append images to the formData
      images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });

      // Append other form data to the formData
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const result = await axios.post(backendUrl, formDataToSend, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
      });

      if (result.status === 201) {
        toast.success("Product added successfully");
        setFormData({
          productName: "",
          productTags: "",
          productCategory: "",
          productDescription: "",
          dueDate: "",
          productPrice: "",
          productQuantity: "",
        });

        setImages([]);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.message);
        return;
      }
      console.log(error);
      toast.error("Product not added.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
  
    if (selectedImages.length !== 4) {
      toast.error("Please select 4 images.");
      return;
    }
  
    try {
      const compressedImages = await Promise.all(
        selectedImages.map(async (image) => await resizeFile(image))
      );
      setImages(compressedImages);
    } catch (error) {
      console.error("Error compressing images:", error);
    }
  };
  

  const imagePreview = images.map((image, index) => (
    <img
      className="p-4 w-28"
      key={index}
      src={URL.createObjectURL(image)}
      alt={`Selected ${index + 1}`}
    />
  ));

  return (
    <>
      <Header />

      <Sidebar />
      <div className="p-4 px-6 mt-5 sm:ml-64 lg:mt-20 flex justify-center">
        <div className="">
          {isLoading ? (
            <div className="loading-gif">
              <img src={LoadingDots} alt="Loading..." />
            </div>
          ) : (
            <>
              <h1 className="text-2xl">Add on Rent</h1>

              <div className="mt-6 lg:-mt-8 flex flex-wrap justify-center content-center">
                <div className="flex flex-col justify-center md:flex-nowrap lg:mr-28">
                  <div className="w-1/2 md:-mt-24 md:w-48 mx-auto">
                    <label htmlFor="image-input">
                      <img src={Image} alt="Gallery" />
                    </label>
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*"
                      multiple={true}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                  <p className="mx-auto">Add 4 product images</p>
                  {images && images.length > 1 ? (
                    <div className="mt-3 max-w-lg flex flex-wrap justify-center border-2 border-slate-400">
                      {imagePreview}
                      <p>selected images</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="min-w-3 mt-6">
                  <form onSubmit={handleSubmit}>
                    <div className="">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        className="h-10 p-4"
                        type="text"
                        id="productName"
                        name="productName"
                        maxLength={40}
                        value={productName}
                        onChange={handleChange}
                        placeholder="Asset Name"
                        required
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="dueDate">Due Date</label>
                      <input
                        className="h-10 p-4"
                        type="date"
                        id="tillDate"
                        name="dueDate"
                        value={dueDate}
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
                        className="h-10 p-4"
                        type="number"
                        id="price"
                        name="productPrice"
                        value={productPrice}
                        onChange={handleChange}
                        min={1}
                        placeholder="350Rs/day"
                        required
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="productQuantity">Quantity</label>
                      <input
                        className="h-10 p-4"
                        type="number"
                        id="quantity"
                        name="productQuantity"
                        value={productQuantity}
                        onChange={handleChange}
                        min={1}
                        placeholder="4"
                        required
                      />
                    </div>

                    <div className="mt-3">
                      <label htmlFor="tags">Tags</label>
                      <input
                        className="h-10 p-4"
                        type="text"
                        id="tags"
                        name="productTags"
                        maxLength={60}
                        value={productTags}
                        onChange={handleChange}
                        placeholder="cutting, digging, etc."
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="productCategory">Product Category</label>
                      <input
                        className="h-10 p-4"
                        type="text"
                        id="productCategory"
                        name="productCategory"
                        maxLength={40}
                        value={productCategory}
                        onChange={handleChange}
                        placeholder="Harvesting, watering, etc."
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
                        value={productDescription}
                        onChange={handleChange}
                        placeholder="Write product description, showing its features and other factors."
                        required
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="mt-4 h-8 w-24 bg-blue-400 active:bg-blue-800 text-white rounded-lg "
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddOnRent;
