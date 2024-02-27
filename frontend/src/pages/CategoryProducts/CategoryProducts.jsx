import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Header, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPrevSearchText } from "../../store/searchSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);
  const prevSearchText = useSelector((state) => state.search.prevSearchText);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Flag to indicate more data availability

  const fetchData = async () => {
    setLoading(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      let response;

      if (category === "latest" || category === "search") {
        if (prevSearchText !== searchText) {
          setPage(1); // Reset page on search change
        }
        dispatch(setPrevSearchText(searchText));
        response = await axios.get(
          `${backendUrl}/api/products/?searchText=${searchText}&page=${page}`
        );
      } else {
        const endpoint =
          category === "recentlyviewed"
            ? "recently-viewed"
            : `category/${category}`;
        response = await axios.get(
          `${backendUrl}/api/products/${endpoint}?page=${page}`
        );
      }

      const newProducts = response.data.products;
      // Use a set to track unique product IDs
      // const uniqueProductIds = new Set(products.map((product) => product.productId));
      // const filteredNewProducts = newProducts.filter((product) => !uniqueProductIds.has(product.productId));

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);

      // Update hasMore flag based on total pages and current page
      setHasMore(response.data.totalPages > page);
      setPage((prev)=>prev+1)
    } catch (error) {
      console.error(error);
      toast.error("Error fetching category products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(searchText, page, category);
  }, [searchText, category]);

  return (
    <>
      <Header />
      <Sidebar />

      <section className="p-4 px-6 mt-16 md:mt-20 md:ml-64">
        <h2 className="text-xl font-semibold text-slate-600">Category: {category}</h2>
        {!products.length ? (
          <h3 className="mt-12">No Products Found</h3>
        ) : (
          <div className="mt-8">
            <InfiniteScroll
              dataLength={products.length} // Number of items currently displayed
              next={() => fetchData()} // Fetch more data on scroll
              hasMore={hasMore} // Display loading indicator if more data available
              loader={<p className="text-center mt-4">Loading...</p>}
              endMessage={<p className="text-center mt-4">No more products to load.</p>}
            >
              <ProductsList products={products} />
            </InfiniteScroll>
          </div>
        )}
        {loading && <p className="text-center mt-4">Loading...</p>}
      </section>
    </>
  );
}

export default CategoryProducts;
