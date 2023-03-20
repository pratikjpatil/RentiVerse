import React from "react";
import "./card.css";

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-main">
          <div className="card-header-main-img">
            <img
              src="https://fmexim.com/images/asset-agri-tools-sickle.jpg"
              alt="img"
            />
          </div>
          <div className="name-heading">
            <div>
              <span className="heading">Tool Name</span>
              <span className="category">Category: Harvesting</span>
            </div>
          
            <span className="pricing">₹230/day</span>
          </div>
        </div>
      </div>
      <div className="discription">
        <span className="discription-header">Discription</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, veniam
          perspiciatis? Culpa animi dolorem, rem placeat doloribus officiis
          commodi molestiae ipsam vero doloremque harum nesciunt iusto sint
          perferendis aspernatur inventore.
        </p>
      </div>
    </div>
  );
};

export default Card;
