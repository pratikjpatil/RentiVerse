import React from "react";
import { useNavigate } from 'react-router-dom';
import "./ToolCard.css";

const ToolCard = ({ data, index }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page-content-main-content-cards tool-card" onClick={() => navigate(`/product/${data.itemId}`)}>
      <div
        key={data.id}
        className="dashboard-page-content-main-content-cards-card"
        style={{ float: "left" }}
      >
        <div
          style={{
            background: `url(${data.toolImages[1].secure_url})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="dashboard-page-content-main-content-cards-card-header-bg"
        >
          <div className="dashboard-page-content-main-content-cards-card-header-img">
            <img src={data.toolImages[0].secure_url} alt="Error loading image" className="cornerImg" />
          </div>
          <div className="dashboard-page-content-main-content-cards-card-header-title">
            <div>
              <h4>{data.toolName}</h4>
              <h5>Category: {data.toolCategory}</h5>
            </div>
            <h3>Rs. {data.toolPrice}</h3>
          </div>
        </div>
        <div className="dashboard-page-content-main-content-cards-card-discription">
          <h5>Description</h5>
          <p>{data.toolDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
