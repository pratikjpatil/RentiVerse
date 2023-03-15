import React from "react";
import { Header, Sidebar, Card } from "../../components";
import "./landingpage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Sidebar />
      <div className="landing-page-content">
        <Card />
      </div>
    </div>
  );
};

export default LandingPage;
