import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.webp";
import LoadingDots from "../../assets/loadingDots.gif";
import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

const AddOnRent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productTags: "",
    productCategory: "",
    productDescription: "",
    dueDate: "",
    productPrice: "",
    // productQuantity: "",
  });

  const categories = [
    "Automobiles",
    "Motorcycle",
    "Technology",
    "Accessories",
    "Books, Magazines",
    "Home Furniture",
    "Toys for Kids",
    "Clothings",
    "Musical Equipments",
    "Sport, Health",
    "Jewellery",
    "Animals, Birds",
    "Other",
  ];

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.status);

  const handleCategoryChange = (event) => {
    setFormData({ ...formData, productCategory: event.target.value });
  };

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
    // productQuantity,
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
        "WEBP",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (productCategory === "null") {
      toast.error("Select Category");
      return;
    }
    const backendUrl = process.env.REACT_APP_BACKEND_URL + "/api/product/add-product";

    setIsLoading(true);
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
          // productQuantity: "",
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
    const toastId = toast.loading("Processing");
    try {
      const compressedImages = await Promise.all(selectedImages.map(async (image) => await resizeFile(image)));
      setImages(compressedImages);

      toast.success("", { id: toastId });
    } catch (error) {
      console.error("Error compressing images:", error);
      toast.error("Error processing images", { id: toastId });
    }
  };

  const imagePreview = images.map((image, index) => (
    <img className='p-4 w-28' key={index} src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} />
  ));

  return (
    <>
      <Header />

      <Sidebar />
      <div className='p-4 px-6 mt-16 md:ml-64 md:mt-20 flex justify-center'>
        <div className=''>
          {isLoading ? (
            <div className='loading-gif'>
              <img src={LoadingDots} alt='Loading...' />
            </div>
          ) : (
            <>
              <h3 className='text-lg md:text-xl font-bold'>Add on Rent</h3>
              <p className='text-xs md:text-sm text-gray-500'>List your product for rent</p>
              <div className='mt-6 lg:-mt-8 flex flex-wrap justify-center content-center'>
                <div className='flex flex-col justify-center md:flex-nowrap lg:mr-28'>
                  <div className='w-1/2 md:-mt-24 md:w-48 mx-auto'>
                    <label htmlFor='image-input'>
                      <img src={Image} alt='Gallery' />
                    </label>
                    <input
                      id='image-input'
                      type='file'
                      accept='image/*'
                      multiple={true}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      required
                    />
                  </div>
                  <p className='mx-auto'>Add 4 product images</p>
                  {images && images.length > 1 ? (
                    <div className='mt-3 max-w-lg flex flex-wrap justify-center border-2 border-slate-400'>
                      {imagePreview}
                      <p>selected images</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className='min-w-3 mt-6'>
                  <form onSubmit={handleSubmit}>
                    <div className='relative'>
                      <label htmlFor='productName'>Product Name</label>
                      <input
                        className='h-10 p-4 block border border-gray-300 rounded-lg w-full pr-12'
                        type='text'
                        id='productName'
                        name='productName'
                        maxLength={40}
                        value={productName}
                        onChange={handleChange}
                        placeholder='Asset Name'
                        required
                      />
                      <div className='absolute right-1 top-10 text-xs text-gray-500 pointer-events-none'>
                        {productName.length}/40
                      </div>
                    </div>

                    <div className='mt-3'>
                      <label htmlFor='dueDate'>Due Date</label>
                      <input
                        className='h-10 p-4 block border border-gray-300 rounded-lg w-full'
                        type='date'
                        id='tillDate'
                        name='dueDate'
                        value={dueDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]} /* Set min to today's date*/
                      />
                    </div>

                    <div className='mt-3'>
                      <label htmlFor='productPrice'>Price</label>
                      <input
                        className='h-10 p-4 block border border-gray-300 rounded-lg w-full'
                        type='number'
                        id='price'
                        name='productPrice'
                        value={productPrice}
                        onChange={handleChange}
                        min={1}
                        placeholder='price per day'
                        required
                      />
                    </div>

                    <div className='mt-3'>
                      <label htmlFor='tags'>Tags</label>
                      <input
                        className='h-10 p-4 block border border-gray-300 rounded-lg w-full'
                        type='text'
                        id='tags'
                        name='productTags'
                        maxLength={60}
                        value={productTags}
                        onChange={handleChange}
                        placeholder='comma seperated tags'
                        required
                      />
                    </div>

                    <div className='mt-3 max-h-96 relative'>
                      <label htmlFor='productDescription'>Description</label>
                      <textarea
                        className={`h-15 w-full resize-y px-4 py-2 border rounded-lg ${
                          productDescription.length > 900 ? "border-red-500" : "border-gray-300"
                        }`}
                        id='description'
                        name='productDescription'
                        maxLength={900}
                        value={productDescription}
                        onChange={handleChange}
                        placeholder='Write product description in max 900 characters'
                        required
                      />
                      <div className='absolute text-right text-xs text-gray-500 bottom-4 right-2'>
                        {productDescription.length}/900
                      </div>
                    </div>

                    <div className='mt-3 w-full'>
                      <label htmlFor='categories'>Select a category:</label>
                      <select
                        id='categories'
                        value={productCategory}
                        onChange={handleCategoryChange}
                        required
                        className='h-10 p-2 block border border-gray-300 rounded-lg w-full'
                      >
                        <option value='null' className='text-slate-500'>
                          Select Category
                        </option>{" "}
                        {categories.map((category, index) => (
                          <option key={index} value={category} className='text-gray-800'>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='flex justify-center'>
                      <button
                        type='submit'
                        className='mt-4 h-8 w-24 bg-blue-400 active:bg-blue-800 text-white rounded-lg'
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
