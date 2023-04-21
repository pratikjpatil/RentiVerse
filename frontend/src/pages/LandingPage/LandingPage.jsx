import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "../../components";
import axios from "axios";
import "./landingpage.css";
import ToolCard from "../../components/card/ToolCard";

const LandingPage = () => {
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5500/showallproducts/allproducts")
      .then((response) => {
        setTools(response.data);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="landing-page">
      <Header onSearch={handleSearch} />
      <Sidebar />
      <div className="landing-page-content">
        {tools
          .filter(
            (tool) =>
              tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              tool.toolCategory.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((tool, index) => (
            <ToolCard data={tool} index={index} />
          ))}
      </div>
    </div>
  );
};

export default LandingPage;
