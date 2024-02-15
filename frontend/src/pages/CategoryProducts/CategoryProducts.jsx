import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Header, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPrevSearchText } from "../../store/searchSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);
  const prevSearchText = useSelector((state) => state.search.prevSearchText);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        let response;
        if (category === "latest" || category === "search") {
          if (prevSearchText !== searchText) {
            setPage(1);
          }

          dispatch(setPrevSearchText(searchText));

          response = await axios.get(
            `${backendUrl}/api/products/?searchText=${searchText}&page=${page}`
          );
          // If searchText changed, set entirely new products
          // If only page changed, add newly fetched products to existing products
          const uniqueProducts = response.data.products.filter(
            (newProduct) =>
              !products.some(
                (existingProduct) =>
                  existingProduct.productId === newProduct.productId
              )
          );
          setProducts((prevProducts) =>
            searchText
              ? response.data.products
              : [...prevProducts, ...uniqueProducts]
          );
        } else {
          if (category === "recentlyviewed") {
            response = await axios.get(
              `${backendUrl}/api/products/recently-viewed?page=${page}`
            );
          } else {
            response = await axios.get(
              `${backendUrl}/api/products/category/${category}?page=${page}`
            );
          }

          // If only page changed, add newly fetched products to existing products
          const uniqueProducts = response.data.products.filter(
            (newProduct) =>
              !products.some(
                (existingProduct) =>
                  existingProduct.productId === newProduct.productId
              )
          );
          setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching category products");
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
  return (
    <>
      <Header />
      <Sidebar />

      <section className="p-4 px-6 mt-16 md:mt-20 md:ml-64">
        <h2 className="text-xl font-semibold text-slate-600">
          Category: {category}
        </h2>
        {!products.length ? (
          <h3 className="mt-12">No Products Found</h3>
        ) : (
          <div className="mt-8">
            <ProductsList products={products} />
          </div>
        )}
      </section>
    </>
  );
}

export default CategoryProducts;
