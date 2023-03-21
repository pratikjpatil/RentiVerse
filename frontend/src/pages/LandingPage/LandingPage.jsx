import React from "react";
import { Header, Sidebar } from "../../components";
import "./landingpage.css";
// import tools from "../../tool-data.json";
const tools = [
  {
    "id": 1,
    "name": "Hand Trowel",
    "category": "Hand Tools",
    "price": "$10",
    "description": "A small handheld tool used for digging, planting, and transplanting small plants."
  },
  {
    "id": 2,
    "name": "Pruning Shears",
    "category": "Hand Tools",
    "price": "$20",
    "description": "A tool used for cutting and trimming plants, shrubs, and small tree branches."
  },
  {
    "id": 3,
    "name": "Hoe",
    "category": "Garden Tools",
    "price": "$15",
    "description": "A tool with a flat blade used for breaking up soil and removing weeds."
  }
];
const LandingPage = () => {
  
  return (
      <div className="landing-page">
        <Header />
        <Sidebar />
        <div className="landing-page-content">
          {tools.map((tool) => (
            <div className="landing-page-content-card" key={tool.id}>
              <div className="landing-page-content-card-header">
                <img src={`https://fmexim.com/images/asset-agri-tools-sickle.jpg`} alt="img" />
                <div className="name-heading">
                  <span className="heading">{tool.name}</span>
                  <span className="category">Category: {tool.category}</span>
                </div>
                <span className="pricing">{tool.price}/day</span>
              </div>
              <div className="discription">
                <span className="discription-header">Description</span>
                <p>{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default LandingPage;
