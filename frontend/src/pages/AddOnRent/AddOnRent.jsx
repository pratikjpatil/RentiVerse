import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.png";
import "./AddOnRent.css";
const AddOnRent = () => {
  const [images, setImages] = useState([]);
  const [toolName, setToolName] = useState("");
  const [tags, setTags] = useState("");
  const [toolcategory, setToolCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      alert("Please select only 4 images.");
      return;
    }
    setImages(selectedImages);
  };

  const handleToolNameChange = (e) => {
    setToolName(e.target.value);
  };
  const toolNameCount = toolName.length;

  const handleTags = (e) => {
    setTags(e.target.value);
  };
  const toolTagsCount = tags.length;

  const handleToolCategary = (e) => {
    setToolCategory(e.target.value);
  };

  const toolToolsCategaryCount = toolcategory.length;

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const descriptionCount = description.length;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body">
        <div className="container">
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
              />
            </div>
            <p className="imageadd">Add 4 images of tool</p>
            <div className="image-preview">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  style={{
                    height: "40px",
                    width: "50px",
                    marginLeft: "4rem",
                    marginRight: "-3rem",
                    marginTop: "2rem",
                  }}
                  alt={`Selected image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="form-box">
            <form className="form-group">
              <div class="input-wrapper">
                <label for="toolname"> Tool Name</label>
                <input
                  className="input-same"
                  type="text"
                  id="toolname"
                  name="toolname"
                  maxLength={20}
                  value={toolName}
                  onInput={handleToolNameChange}
                  placeholder="Sickle"
                />
                <span class="input-fixed-text">{toolNameCount}</span>
              </div>

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
              <label for="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="price"
                placeholder="4"
              />
              <div class="input-wrapper">
                <label for="tags">Tags </label>
                <input
                  className="input-same"
                  type="text"
                  id="tags"
                  name="tags"
                  maxLength={30}
                  value={tags}
                  onInput={handleTags}
                  placeholder="cutting, digging, etc."
                />
                <span class="input-fixed-text">{toolTagsCount}</span>
              </div>
              <div class="input-wrapper">
                <label for="toolcategory">Tool Category</label>
                <input
                  className="input-same"
                  type="text"
                  id="toolcategory"
                  name="toolcategory"
                  maxLength={20}
                  value={toolcategory}
                  onInput={handleToolCategary}
                  placeholder="Harvesting, watering, etc."
                />
                <span class="input-fixed-text">{toolToolsCategaryCount}</span>
              </div>
              <div class="input-wrapper">
                <label for="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={180}
                  value={description}
                  onInput={handleDescription}
                  placeholder="This has sharp blades and can be used for cutting grass, maize. And wants to give this on rent for 2 days and with some conditions..."
                ></textarea>
                <span class="input-fixed-textarea">{descriptionCount}</span>
              </div>
              <input type="submit" value="Post" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddOnRent;
