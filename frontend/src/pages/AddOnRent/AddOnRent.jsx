import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Image from "../../assets/Upload.png"
import "./AddOnRent.css";
const AddOnRent = () => {
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
              <img src={Image} alt="Gallery" />
            </div>
            <p className="">Add 4 images of tool</p>
          </div>
          <div className="form-box">
            <form className="form-group">
              <label for="toolname">Tool Name</label>
              <input
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
                type="text"
                id="tags"
                name="tags"
                placeholder="cutting, digging, etc. (max 180 characters)"
              />
              <label for="toolcategory">Tool Category</label>
              <input
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
