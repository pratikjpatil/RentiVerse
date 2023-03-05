import React from "react";
import { Header, Sidebar } from "../../components";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Sidebar />
      <div className="landing-page-content">
        <div className="landing-page-content-card">
          <div className="landing-page-content-card-header">
            <img src="https://fmexim.com/images/asset-agri-tools-sickle.jpg" alt="img" />
            <div className="name-heading">
              <span className="heading">Tool Name</span>
              <span className="category">Category: Harvesting</span>
            </div>
            <span className="pricing">₹230/day</span>
          </div>
          <div className="discription">
            <span className="discription-header">Discription</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
              veniam perspiciatis? Culpa animi dolorem, rem placeat doloribus
              officiis commodi molestiae ipsam vero doloremque harum nesciunt
              iusto sint perferendis aspernatur inventore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
