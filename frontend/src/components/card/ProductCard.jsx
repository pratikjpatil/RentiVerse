import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ToolCard.css";

const ProductCard = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page-content-main-content-cards product-card z-10" key={data.productId} 
    onClick={() => navigate(`/product/${data.productId}`)}>
      <div
        className="dashboard-page-content-main-content-cards-card"
        style={{ float: "left" }}
      >
        <div
          style={{
            background: `url(${data.productImages[1].secure_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="dashboard-page-content-main-content-cards-card-header-bg"
        >
          <div className="dashboard-page-content-main-content-cards-card-header-img">
            <img src={data.productImages[0].secure_url} alt="Error loading image" className="cornerImg" />
          </div>
          <div className="dashboard-page-content-main-content-cards-card-header-title">
            <div>
              <h4>{data.productName}</h4>
              <h5>Category: {data.productCategory}</h5>
            </div>
            <h3>Rs. {data.productPrice}</h3>
          </div>
        </div>
        <div className="dashboard-page-content-main-content-cards-card-discription">
          <h5>Description</h5>
          <p>{data.productDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
