// ProductPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Sidebar } from "../../components";
import "./ProductPage.css";
import rentiVerseLoadingGif from "../../assets/rentiVerseLoadingGif.gif";
import toast from 'react-hot-toast';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dueDate: "",
    message: "",
  });
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/item/item-info/${productId}`
        );

        if (result.status === 200) {
          setProduct(result.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          window.alert("Product not found");
        } else {
          window.alert("Error fetching product");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProductInfo();
  }, [productId]);

  const handleImageClick = (index) => {
    // Swap the positions of the big image (4th image) and the clicked small image
    if (index !== 3) {
      const updatedImages = [...product.toolImages];
      [updatedImages[index], updatedImages[3]] = [
        updatedImages[3],
        updatedImages[index],
      ];
      setProduct({ ...product, toolImages: updatedImages });
      setSelectedImageIndex(index);
    }
  };

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const result = await axios.post(
        `${backendUrl}/api/request/send/${productId}`,
        formData,
        { withCredentials: true }
      );

      if (result.status === 201) {
        console.log(result.data);
        window.alert("Product request sent");
      }
    } catch (error) {
      if (error.response.status === 404) {
        window.alert("Invalid tool\nTool not found");
      } else if (error.response.status === 409) {
        window.alert("Request already sent!");
      } else if (error.response.status === 400) {
        window.alert("Can't sent the request!\nEither owner of this tool has already accepted a request or you are sending request to your own tool");
      } else if (error.response.status === 401) {
        window.alert("You are not logged in");
        navigate("/login");
      } else {
        window.alert("Internal server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body-productpage">
      <Header />
      <Sidebar />

      {isLoading || !product ? (
        <div>
          <img
            src={rentiVerseLoadingGif}
            className="rentiVerseLoadingGif"
            alt="Loading..."
          />
        </div>
      ) : (
        <>
          <div className="container-productpage">
            <h1 className="title-productpage">Renting Request</h1>
          </div>
          <div className="container-productpage" id="white-box">
            <div className="left-box">
              <h2 className="heading-productpage">{product.toolName}</h2>
              <div className="gallery-productpage">
                <img
                  className="big-image image"
                  src={product.toolImages[3].secure_url}
                  alt="Product"
                />
                <div className="small-images">
                  {product.toolImages.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      className={`small-images-productpage image ${
                        index === selectedImageIndex ? "selected" : ""
                      }`}
                      src={image.secure_url}
                      alt="Product"
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="right-box">
              <h3 className="owner-productpage">
                <span className="author">By</span> {product.ownerName}
              </h3>
              <button className="grey-button">
                {product.toolPrice} Rs/day
              </button>
              <p className="description-productpage">
                Description: <br /> {product.toolDesc}
              </p>

              <form onSubmit={formSubmissionHandler}>
                <label className="label-productpage" htmlFor="till-date">
                  Available Quantity:
                </label>
                <button className="grey-button">{product.toolQuantity}</button>
                <label className="label-productpage" htmlFor="till-date">
                  Availability Till:
                </label>
                <button className="grey-button">
                  {product.dueDate.split("T")[0]}
                </button>
                <label className="label-productpage" htmlFor="till-date">
                  Due Date:
                </label>
                <input
                  className="input-productpage-date"
                  type="date"
                  id="till-date"
                  name="till-date"
                  placeholder="DD/MM/YY"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setFormData({ ...formData, dueDate: e.target.value });
                  }}
                  required
                />

                <label className="label-productpage" htmlFor="message">
                  Message:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="input-message"
                    placeholder="Add message for owner here"
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    required
                  />
                </div>
                <input
                  className="submit-button-productpage"
                  type="submit"
                  value={"Send Request"}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductPage;
