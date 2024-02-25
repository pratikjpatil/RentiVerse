import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, Sidebar } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import ProductsList from "../../components/ProductsList/ProductsList";

import landingBanner from "../../assets/landing-banner.webp";
import post1 from "../../assets/posts/1.jpg";
import post2 from "../../assets/posts/2.jpg";
import post3 from "../../assets/posts/3.jpg";
import post4 from "../../assets/posts/4.jpg";
import carIcon from "../../assets/categories/car.png";
import motorbikeIcon from "../../assets/categories/motorbike.png";
import cpuIcon from "../../assets/categories/cpu.png";
import watchIcon from "../../assets/categories/watch.png";
import bookIcon from "../../assets/categories/book.png";
import sofaIcon from "../../assets/categories/sofa.png";
import toyIcon from "../../assets/categories/toy.png";
import shirtIcon from "../../assets/categories/shirt.png";
import musicIcon from "../../assets/categories/music.png";
import ballIcon from "../../assets/categories/ball.png";
import diamondIcon from "../../assets/categories/diamond.png";
import animalIcon from "../../assets/categories/animal.png";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${backendUrl}/api/products/?limit=9`);

        const uniqueProducts = response.data.products.filter(
          (newProduct) =>
            !products.some(
              (existingProduct) =>
                existingProduct.productId === newProduct.productId
            )
        );
        setProducts((prevProducts) => [...prevProducts, ...uniqueProducts]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${backendUrl}/api/products/recently-viewed?limit=9`
        );

        const uniqueProducts = response.data.products.filter(
          (newProduct) =>
            !recentlyViewedProducts.some(
              (existingProduct) =>
                existingProduct.productId === newProduct.productId
            )
        );
        setRecentlyViewedProducts((prevProducts) => [
          ...prevProducts,
          ...uniqueProducts,
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      name: "Automobiles",
      imageSrc: carIcon,
    },
    {
      name: "Motorcycle",
      imageSrc: motorbikeIcon,
    },
    {
      name: "Technology",
      imageSrc: cpuIcon,
    },
    {
      name: "Accessories",
      imageSrc: watchIcon,
    },
    {
      name: "Books, magazines",
      imageSrc: bookIcon,
    },
    {
      name: "Home furniture",
      imageSrc: sofaIcon,
    },
    {
      name: "Toys for kids",
      imageSrc: toyIcon,
    },
    {
      name: "Clothings",
      imageSrc: shirtIcon,
    },
    {
      name: "Musical equipments",
      imageSrc: musicIcon,
    },
    {
      name: "Sport, health",
      imageSrc: ballIcon,
    },
    {
      name: "Jewellery",
      imageSrc: diamondIcon,
    },
    {
      name: "Animals, birds",
      imageSrc: animalIcon,
    },
    {
      name: "Other",
      imageSrc: ballIcon, // You might want to change this
    },
  ];

  return (
    <>
      <Header />
      <Sidebar />

      <section className="mt-20 md:ml-64 px-2">
        <section className="padding-top-sm">
          <div className="container mx-auto sm:px-4">
            <article className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
              <img src={landingBanner} className="w-full" />
            </article>
          </div>
        </section>

        <section className="padding-top">
          <div className="container mx-auto sm:px-4">
            <h3 className="my-4 font-semibold text-slate-700">
              Popular categories
            </h3>

            <nav className="flex flex-wrap gy-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="lg:w-1/5 p-2 md:w-1/4 sm:w-1/3 w-1/2"
                >
                  <div
                    className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 hover:border-gray hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/category/${category.name}`);
                    }}
                  >
                    <div className="p-6">
                      <span className="block size-32x32 mb-2 opacity-07">
                        <img width={32} height={32} src={category.imageSrc} />
                      </span>
                      <div className="stretched-link block text-body">
                        {category.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </section>

        <section className="padding-top">
          <div className="container mx-auto sm:px-4">
            <div className="my-4 flex justify-between">
              <h3 className="inline-block text-lg pl-2 font-semibold text-slate-700">
                Latest Deals
              </h3>
              <button
                className="text-xs md:text-sm bg-gray-200 rounded-lg px-2"
                onClick={() => {
                  navigate(`/category/latest`);
                }}
              >
                Show more
              </button>
            </div>

            <ProductsList products={products} />
          </div>
        </section>

        <section className="padding-top-sm">
          <div className="container mx-auto sm:px-4">
            <div className="my-4 flex justify-between">
              <h3 className="inline-block text-lg pl-2 font-semibold text-slate-700">
                You recently looked
              </h3>
              <button
                className="text-xs md:text-sm bg-gray-200 rounded-lg px-2"
                onClick={() => navigate("/category/recentlyviewed")}
              >
                Show more
              </button>
            </div>

            <ProductsList products={recentlyViewedProducts} />
          </div>
        </section>

        <section className="padding-top-sm">
          <div className="container mx-auto sm:px-4">
            <article
              className="rounded p-12 bg-primary-light"
              style={{ minHeight: 200 }}
            >
              <h4 className="text-center my-3">Why use our services?</h4>
              <p className="text-center mx-auto" style={{ maxWidth: 720 }}>
                We are proud about dummy text on template, Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex flex-wrap  md:justify-center my-4">
                <div className="lg:w-1/4 pr-4 pl-4 md:w-1/3 pr-4 pl-4">
                  <figure className="flex items-center">
                    <div className="me-3">
                      <span className="flex flex-center-xy rounded-full size-44x44 bg-white shadow-sm">
                        <i className="fa-lg fa fa-star text-blue-600" />
                      </span>
                    </div>
                    <figcaption className="info">
                      <h5 className="mb-0">11 years in market</h5>
                      <p className="mb-0">We are proud of it </p>
                    </figcaption>
                  </figure>
                </div>

                <div className="lg:w-1/4 pr-4 pl-4 md:w-1/3 pr-4 pl-4">
                  <figure className="flex items-center">
                    <div className="me-3">
                      <span className="flex flex-center-xy rounded-full size-44x44 bg-white shadow-sm">
                        <i className="fa-lg fa fa-box text-blue-600" />
                      </span>
                    </div>
                    <figcaption className="info">
                      <h5 className="mb-0">1+ million items</h5>
                      <p className="mb-0">Super exited about it </p>
                    </figcaption>
                  </figure>
                </div>

                <div className="lg:w-1/4 pr-4 pl-4 md:w-1/3 pr-4 pl-4">
                  <figure className="flex items-center">
                    <div className="me-3">
                      <span className="flex flex-center-xy rounded-full size-44x44 bg-white shadow-sm">
                        <i className="fa-lg fa fa-users text-blue-600" />
                      </span>
                    </div>
                    <figcaption className="info">
                      <h5 className="mb-0">33 019 Sellers</h5>
                      <p className="mb-0">Again we are proud </p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="padding-y">
          <div className="container mx-auto sm:px-4">
            <header className="mb-4">
              <h2>News blog </h2>
            </header>
            <div className="flex flex-wrap ">
              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                <article>
                  <div className="img-wrap">
                    <img className="rounded w-full" src={post1} height={160} />
                  </div>
                  <div className="mt-3">
                    <div>
                      <h6 className="title">How to avoid climate disaster</h6>
                    </div>
                    <time
                      className="text-gray-700 mb-1"
                      dateTime="2022-02-14 00:00"
                    >
                      <i className="fa fa-calendar-alt" /> 23.12.2021
                    </time>
                    <p>
                      When you enter into any new area of science, you almost
                      reach
                    </p>
                  </div>
                </article>
              </div>

              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                <article>
                  <div className="img-wrap">
                    <img className="rounded w-full" src={post2} height={160} />
                  </div>
                  <div className="mt-3">
                    <div>
                      <h6 className="title">How to choose clothes</h6>
                    </div>
                    <time
                      className="text-gray-700 mb-1"
                      dateTime="2022-02-14 00:00"
                    >
                      <i className="fa fa-calendar-alt" /> 13.11.2020
                    </time>
                    <p>
                      When you enter into any new area of science, you almost
                      reach
                    </p>
                  </div>
                </article>
              </div>

              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                <article>
                  <div className="img-wrap">
                    <img className="rounded w-full" src={post3} height={160} />
                  </div>
                  <div className="mt-3">
                    <div>
                      <h6 className="title">How to promote brands</h6>
                    </div>
                    <time
                      className="text-gray-700 mb-1"
                      dateTime="2022-02-14 00:00"
                    >
                      <i className="fa fa-calendar-alt" /> 23.12.2021
                    </time>
                    <p>
                      When you enter into any new area of science, you almost
                      reach
                    </p>
                  </div>
                </article>
              </div>

              <div className="lg:w-1/4 pr-4 pl-4 md:w-1/2 pr-4 pl-4 sm:w-1/2 pr-4 pl-4">
                <article>
                  <div className="img-wrap">
                    <img className="rounded w-full" src={post4} height={160} />
                  </div>
                  <div className="mt-3">
                    <div>
                      <h6 className="title">The best laptops in 2021</h6>
                    </div>
                    <time
                      className="text-gray-700 mb-1"
                      dateTime="2022-02-14 00:00"
                    >
                      <i className="fa fa-calendar-alt" /> 23.12.2021
                    </time>
                    <p>
                      When you enter into any new area of science, you almost
                      reach
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <footer className="section-footer mt-6 pt-6 footer-dark bg-gray-900  text-white">
          <div className="container mx-auto sm:px-4">
            <section className="footer-main padding-y-lg">
              <div className="flex flex-wrap ">
                <aside className="w-1/2 sm:w-1/3 pr-4 pl-4 lg:w-1/5 pr-4 pl-4">
                  <h6 className="title">Store</h6>
                  <ul className="list-menu mb-4">
                    <li>
                      <div>About us</div>
                    </li>
                    <li>
                      <div>Find store</div>
                    </li>
                    <li>
                      <div>Categories</div>
                    </li>
                    <li>
                      <div>Blogs</div>
                    </li>
                  </ul>
                </aside>
                <aside className="w-1/2 sm:w-1/3 pr-4 pl-4 lg:w-1/5 pr-4 pl-4">
                  <h6 className="title">Information</h6>
                  <ul className="list-menu mb-4">
                    <li>
                      <div>Help center</div>
                    </li>
                    <li>
                      <div>Money refund</div>
                    </li>
                    <li>
                      <div>Shipping info</div>
                    </li>
                    <li>
                      <div>Refunds</div>
                    </li>
                  </ul>
                </aside>
                <aside className="w-1/2 sm:w-1/3 pr-4 pl-4  lg:w-1/5 pr-4 pl-4">
                  <h6 className="title">Support</h6>
                  <ul className="list-menu mb-4">
                    <li>
                      <div> Help center </div>
                    </li>
                    <li>
                      <div> Documents </div>
                    </li>
                    <li>
                      <div> Account restore </div>
                    </li>
                    <li>
                      <div> My Orders </div>
                    </li>
                  </ul>
                </aside>
                <aside className="w-1/2 sm:w-1/3 pr-4 pl-4 lg:w-1/5 pr-4 pl-4">
                  <h6 className="title">Useful links</h6>
                  <ul className="list-menu mb-4">
                    <li>
                      <div> Careers </div>
                    </li>
                    <li>
                      <div> Mission Vision </div>
                    </li>
                    <li>
                      <div> Management </div>
                    </li>
                    <li>
                      <div> Sitemap </div>
                    </li>
                  </ul>
                </aside>
              </div>
            </section>
            <hr className="my-0" />
            <section className="footer-bottom flex justify-between">
              <div className="text-white-50">Made by Pratik</div>
            </section>
          </div>
        </footer>
      </section>
    </>
  );
};

export default LandingPage;
