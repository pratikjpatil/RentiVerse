import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import { Header, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setPrevSearchText } from "../../store/searchSlice";
import axios from "axios";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

function SearchPage() {
  const [products, setProducts] = useState([]);
  const searchText = useSelector((state) => state.search.searchText);
  const prevSearchText = useSelector((state) => state.search.prevSearchText);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await axios.get(`${backendUrl}/api/products/?searchText=${searchText}&page=${page}`);

      const newProducts = response.data.products;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(response.data.totalPages > page);
    } catch (error) {
      console.error(error);
      toast.error("Error searching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prevSearchText !== searchText) {
      setPage(1); // Reset page on search change
      setProducts([]);
      dispatch(setPrevSearchText(searchText));
    }
  }, [searchText, dispatch, prevSearchText]);

  useEffect(() => {
    fetchData();
  }, [searchText, page]);

  return (
    <>
      <Header showSearchBar={true} />
      <Sidebar />

      <section className='p-4 px-6 mt-16 md:mt-20 md:ml-64'>
        <h2 className='text-xl font-semibold text-slate-600'>Search Results:</h2>
        {!products.length ? (
          <h3 className='mt-12'>No Products Found</h3>
        ) : (
          <div className='mt-8'>
            <InfiniteScroll
              dataLength={products.length} // Number of items currently displayed
              next={() => setPage((prev) => prev + 1)} // Increment page to fetch more data
              hasMore={hasMore} // Display loading indicator if more data available
              loader={<p className='text-center mt-4'>Loading...</p>}
              endMessage={<p className='text-center mt-4'>No more products to load.</p>}
            >
              <ProductsList products={products} />
            </InfiniteScroll>
          </div>
        )}
        {loading && <p className='text-center mt-4'>Loading...</p>}
      </section>
    </>
  );
}

export default SearchPage;
