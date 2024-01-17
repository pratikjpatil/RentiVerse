import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Header, Sidebar } from "../../components";
import axios from "axios";
import "./landingpage.css";
import loadingGif from "../../assets/rentiVerseLoadingGif.gif";
import ProductCard from "../../components/card/ProductCard";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track if data is being loaded
  const [searchText, setSearchText] = useState("");
  const [prevSearchText, setPrevSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if(prevSearchText!==searchText){
          setPage(1);
        }else{
          setPrevSearchText(searchText)
        }
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/products/?searchText=${searchText}&page=${page}`);
        // If searchText changed, set entirely new products
        // If only page changed, add newly fetched products to existing products
        const uniqueProducts = response.data.products.filter(newProduct => !products.some(existingProduct => existingProduct.productId === newProduct.productId));
        setProducts((prevProducts) => (searchText ? response.data.products : [...prevProducts, ...uniqueProducts]));
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchText, page]);



  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if the user is near the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Include loading in the dependencies to avoid unnecessary re-renders

  console.log(products)

  return (
    <div className="landing-page">
      <Header setSearchText={setSearchText} />
      <Sidebar />
      <div className="landing-page-content">
        {products &&
          products.map((product, index) => (
            <ProductCard
              data={product}
              index={index}
              key={product.productId}
              onClick={() => navigate(`/product/${product.productId}`)}
            />
          ))}
        {loading && <img src={loadingGif} alt="Loading..." />}
      </div>
    </div>
  );
};

export default LandingPage;
