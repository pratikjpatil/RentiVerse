import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.png";
import LoadingDots from "../../assets/loadingDots.gif"
import toast from 'react-hot-toast';
import "./AddOnRent.css";

const AddOnRent = () => {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    toolName: "",
    toolTags: "",
    toolCategory: "",
    toolDesc: "",
    dueDate: "",
    toolPrice: "",
    toolQuantity: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You are not logged in!");
      navigate('/login');
      return;
    }

  }, []);


  const { toolName, toolTags, toolCategory, toolDesc, dueDate, toolPrice, toolQuantity } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const backendUrl = process.env.REACT_APP_BACKEND_URL + "/api/item/add-item";
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

      const result = await axios.post(backendUrl, formDataToSend, { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true });

      if (result.status === 201) {
        toast.success("Item added successfully");
        setFormData({
          toolName: "",
          toolTags: "",
          toolCategory: "",
          toolDesc: "",
          dueDate: "",
          toolPrice: "",
          toolQuantity: "",
        });
      }

    } catch (error) {

      if (error.response.status === 400) {
        toast.error("Not selected 4 images");
        return;
      }
      console.log(error);
      toast.error("Item not added.");

    }
    finally {
      setIsLoading(false);
    }

  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    // Check the size of each selected image
    const invalidImages = selectedImages.filter((image) => image.size > 6 * 1024 * 1024); // 6MB in bytes

    if (invalidImages.length > 0) {
      toast.error("Please select images less than 6MB in size.");
      return;
    }
    if (selectedImages.length !== 4) {
      toast.error("Please select 4 images.");
      return;
    }
    setImages(selectedImages);
  };

  const imagePreview = images.map((image, index) => (
    <img
      key={index}
      src={URL.createObjectURL(image)}
      style={{ height: "40px", width: "50px", marginLeft: "4rem", marginRight: "-3rem", marginTop: "2rem" }}
      alt={`Selected ${index + 1}`}
    />
  ));

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body">
        <div className="container">
        {isLoading ? (
              <div className="loading-gif">
                <img src={LoadingDots} alt="Loading..." />
              </div>
            ) : (
            <>
          <div className="header-content">
            <h1>Add on Rent</h1>
          </div>
          <div className="gallery">
            <div className="browse-box">
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
            <p className="imageadd">Add 4 images of tool</p>
            <div className="image-preview">{imagePreview}</div>
          </div>

          <div className="form-box">
              <form className="form-group" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <label htmlFor="toolName">Tool Name</label>
                  <input
                    className="input-same"
                    type="text"
                    id="toolName"
                    name="toolName"
                    maxLength={40}
                    value={toolName}
                    onChange={handleChange}
                    placeholder="Asset Name"
                    required
                  />
                  <span className="input-fixed-text">{toolName.length}</span>
                </div>

                <label htmlFor="dueDate">Till Date</label>
                <input type="date" id="tillDate" name="dueDate" value={dueDate} required onChange={handleChange} min={new Date().toISOString().split("T")[0]} /* Set min to today's date*/ />

                <label htmlFor="toolPrice">Price</label>
                <input type="number" id="price" name="toolPrice" value={toolPrice} onChange={handleChange} min={1} placeholder="350Rs/day" required/>

                <label htmlFor="toolQuantity">Quantity</label>
                <input type="number" id="quantity" name="toolQuantity" value={toolQuantity} onChange={handleChange} min={1} placeholder="4" required/>

                <div className="input-wrapper">
                  <label htmlFor="tags">Tags</label>
                  <input
                    className="input-same"
                    type="text"
                    id="tags"
                    name="toolTags"
                    maxLength={60}
                    value={toolTags}
                    onChange={handleChange}
                    placeholder="cutting, digging, etc."
                    required
                  />
                  <span className="input-fixed-text"></span>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="toolCategory">Tool Category</label>
                  <input
                    className="input-same"
                    type="text"
                    id="toolCategory"
                    name="toolCategory"
                    maxLength={40}
                    value={toolCategory}
                    onChange={handleChange}
                    placeholder="Harvesting, watering, etc."
                    required
                  />
                  <span className="input-fixed-text"></span>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="toolDesc">Description</label>
                  <textarea
                    id="description"
                    name="toolDesc"
                    maxLength={180}
                    value={toolDesc}
                    onChange={handleChange}
                    placeholder="This has sharp blades and can be used for cutting grass, maize. And wants to give this on rent for 2 days and with some conditions..."
                    required
                  ></textarea>
                  <span className="input-fixed-textarea"></span>
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            
          </div>
          </>
          )}
        </div>
        
      </div>
      
    </>
  );
};

export default AddOnRent;
