import React, { useEffect, useRef, useState } from "react";
import { Header, Sidebar } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addListedProducts, addGivenOnRentProducts, addTakenOnRentProducts, addDraftProducts } from "../../store/productsSlice";
import axios from "axios";
import ProductsList from "../../components/ProductsList/ProductsList";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const Dashboard = () => {

  const [productChange, setProductChange] = useState(false);

  const listedProducts = useSelector(state => state.products.listedProducts);
  const givenProducts = useSelector(state => state.products.givenOnRent);
  const takenProducts = useSelector(state => state.products.takenOnRent);
  const draftProducts = useSelector(state => state.products.draftProducts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=>state.auth.status);

  const givenSectionRef = useRef(null);
  const takenSectionRef = useRef(null);
  const draftsSectionRef = useRef(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    
    const fetchProducts = async () => {
      try {
        if (!isLoggedIn) {
          toast.error("You are not logged in!");
          navigate("/login");
          return;
        }
        const listed = await axios.get(`${backendUrl}/api/products/listed`, {
          withCredentials: true,
        });
        const given = await axios.get(
          `${backendUrl}/api/products/givenonrent`,
          { withCredentials: true }
        );
        const taken = await axios.get(
          `${backendUrl}/api/products/takenonrent`,
          { withCredentials: true }
        );
        
        const drafts = await axios.get(
          `${backendUrl}/api/products/drafts`,
          { withCredentials: true }
        );

        if (listed.status === 200) {
          dispatch(addListedProducts(listed.data))
        }
        if (given.status === 200) {
          dispatch(addGivenOnRentProducts(given.data))
        }
        if (taken.status === 200) {
          dispatch(addTakenOnRentProducts(taken.data))
        }
        if (drafts.status === 200) {
          dispatch(addDraftProducts(drafts.data))
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchProducts(); 
  }, [isLoggedIn, productChange]);

  const onAction = () => {
    setProductChange((prev)=>!prev);
  }

  const scrollToGivenProductsSection = () => {
    givenSectionRef.current.scrollIntoView({behavior: "smooth"})
  }

  const scrollToTakenProductsSection = () => {
    takenSectionRef.current.scrollIntoView({behavior: "smooth"})
  }

  const scrollToDraftProductsSection = () => {
    draftsSectionRef.current.scrollIntoView({behavior: "smooth"})
  }

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header/>
      <Sidebar />
      <div className="p-4 px-6 mt-16 md:mt-20 md:ml-64">
        <div>
          <span className="text-lg md:text-xl font-bold">Dashboard</span>
          <p className="text-xs md:text-sm text-gray-500">Home / Dashboard</p>
        </div>
        <div className="py-4 flex flex-wrap items-center gap-4 lg:gap-14">
          <div className="w-full md:w-56 flex p-2 rounded-lg bg-orange-100 justify-around items-center">
            <div className="flex flex-col p-2 gap-2">
              <span className="text-sm md:text-base font-medium">Listed for rent</span>
              <p className="text-xl md:text-2xl font-medium text-red-600">{listedProducts.length}</p>
            </div>
            <div
              
              onClick={() => navigate("/addonrent")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 stroke-current text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
          <div onClick={scrollToGivenProductsSection} className="w-full md:w-56 flex p-2 rounded-lg bg-orange-100 justify-around items-center">
            <div className="flex flex-col p-2 gap-2">
              <span className="text-sm md:text-base font-medium">Given on rent</span>
              <p className="text-xl md:text-2xl font-medium text-red-600">{givenProducts.length}</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 stroke-current text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
          </div>
          <div onClick={scrollToTakenProductsSection} className="w-full md:w-56 flex p-2 rounded-lg bg-orange-100 justify-around items-center">
            <div className="flex flex-col p-2 gap-2">
              <span className="text-sm md:text-base font-medium">Taken on rent</span>
              <p className="text-xl md:text-2xl font-medium text-red-600">{takenProducts.length}</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 stroke-current text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>
          <div onClick={scrollToDraftProductsSection} className="w-full md:w-56 flex p-2 rounded-lg bg-orange-100 justify-around items-center">
            <div className="flex flex-col p-2 gap-2">
              <span className="text-sm md:text-base font-medium">Draft Products</span>
              <p className="text-xl md:text-2xl font-medium text-red-600">{draftProducts.length}</p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-7 stroke-current text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex mt-4 items-center justify-between pb-4">
            <div className="">
              <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">Listed</span>
              <p className="text-xs text-gray-500">Overall Information</p>
            </div>
            <div className="">
              <button className="px-2 md:px-6 text-xs md:text-base h-6 md:h-10 rounded-full bg-gradient-to-r from-green-500 to-gray-700 border-none font-medium text-white">Owned</button>
            </div>
          </div>
          {!listedProducts.length ? (
            <p className="font-semibold text-orange-300">No products found</p>
          ) : (
            <ProductsList
                products={listedProducts}
                onAction={onAction}
                isDeletable={true}
              />
          )}
        </div>
        <div ref={givenSectionRef} className="">
          <div className="flex mt-4 items-center justify-between pb-4">
            <div className="">
              <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">Given on Rent</span>
              <p className="text-xs text-gray-500">Overall Information</p>
            </div>
            <div className="">
              <button className="px-2 md:px-6 text-xs md:text-base h-6 md:h-10 rounded-full bg-gradient-to-r from-green-500 to-gray-700 border-none font-medium text-white">Given</button>
            </div>
          </div>
          {!givenProducts.length ? (
            <p className="font-semibold text-orange-300">No products found</p>
          ) : (
          <ProductsList
            products={givenProducts}
          />
          )}
        </div>
        <div ref={takenSectionRef} className="">
          <div className="flex mt-4 items-center justify-between pb-4">
            <div className="">
              <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">Taken on Rent</span>
              <p className="text-xs text-gray-500">Overall Information</p>
            </div>
            <div className="">
              <button className="px-2 md:px-6 text-xs md:text-base h-6 md:h-10 rounded-full bg-gradient-to-r from-green-500 to-gray-700 border-none font-medium text-white">Taken</button>
            </div>
          </div>
          {!takenProducts.length ? (
            <p className="font-semibold text-orange-300">No products found</p>
          ) : (
            
              <ProductsList
                products={takenProducts}
              />
            
          )}
        </div>

        <div ref={draftsSectionRef} className="">
          <div className="flex mt-4 items-center justify-between pb-4">
            <div className="">
              <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">Draft Products</span>
              <p className="text-xs text-gray-500">Overall Information</p>
            </div>
            <div className="">
              <button className="px-2 md:px-6 text-xs md:text-base h-6 md:h-10 rounded-full bg-gradient-to-r from-green-500 to-gray-700 border-none font-medium text-white">Drafts</button>
            </div>
          </div>
          {!draftProducts.length ? (
            <p className="font-semibold text-orange-300">No products found</p>
          ) : (
            
              <ProductsList
                products={draftProducts}
                onAction={onAction}
                isDeletable={true}
                isEditable={true}
              />
            
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
