import React from "react";
import "./ToolCard.css";
// import db from "../../db/db.json";

const ToolCard = ({ data, index }) => {
  console.log(data.toolname);
  return (
    <div className="dashboard-page-content-main-content-cards">
      <>
        <div
          key={data.toolId}
          className="dashboard-page-content-main-content-cards-card" style={{float:"left"}}
        >
          <div
            style={{
              background: `url(${data.bg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
            className="dashboard-page-content-main-content-cards-card-header-bg"
          >
            <div className="dashboard-page-content-main-content-cards-card-header-img">
              <img src={data.toolimg} alt="" />
            </div>
            <div className="dashboard-page-content-main-content-cards-card-header-title">
              <div>
                <h4>{data.toolName}</h4>
                <h5>Category:{data.toolCategory}</h5>
              </div>
              <h3>{data.toolPrice}</h3>
            </div>
          </div>
          <div className="dashboard-page-content-main-content-cards-card-discription">
            <h5>Discription</h5>
            <p>{data.toolDesc}</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default ToolCard;
