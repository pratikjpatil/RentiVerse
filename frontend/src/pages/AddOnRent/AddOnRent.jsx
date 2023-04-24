import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.png";
import "./AddOnRent.css";
const AddOnRent = () => {
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      alert("Please select only 4 images.");
      return;
    }
    setImages(selectedImages);
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body">
        <div className="container">
          <div className="header-content">
            <h1>Add on Rent</h1>
          </div>

          {/* <div className="gallery">
            <div className="browse-box">
              <img src={Image} alt="Gallery" />
            </div>
            <p className="imageadd">Add 4 images of tool</p>
          </div> */}
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
              />
            </div>
            <p className="imageadd">Add 4 images of tool</p>
            <div className="image-preview">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  style={{height:"40px", width:"50px",marginLeft:"4rem", marginRight:"-3rem", marginTop:"2rem"}}
                  alt={`Selected image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="form-box">
            <form className="form-group">
              <label for="toolname">Tool Name</label>
              <input
                className="input-same"
                type="text"
                id="toolname"
                name="toolname"
                placeholder="Sickle (max 15 characters)"
              />
              <label for="tilldate">Till Date</label>
              <input
                type="date"
                id="tilldate"
                name="tilldate"
                placeholder="DD/MM/YY"
              />
              <label for="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="350Rs/day"
              />
              <label for="tags">Tags</label>
              <input
                className="input-same"
                type="text"
                id="tags"
                name="tags"
                placeholder="cutting, digging, etc. (max 180 characters)"
              />
              <label for="toolcategory">Tool Category</label>
              <input
                className="input-same"
                type="text"
                id="toolcategory"
                name="toolcategory"
                placeholder="Harvesting, watering, etc. (max 20 characters)"
              />
              <label for="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="This has sharp blades and can be used for cutting grass, maize. And wants to give this on rent for 2 days and with some conditions.... (max 360 characters)"
              ></textarea>
              <input type="submit" value="Post" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddOnRent;
