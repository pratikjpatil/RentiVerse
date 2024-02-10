import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header, Sidebar } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import ProductsList from "../../components/ProductsList/ProductsList";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Track if data is being loaded
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${backendUrl}/api/products/?limit=9`
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
        setProducts((prevProducts) =>[...prevProducts, ...uniqueProducts]);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching products");
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

        // If only page changed, add newly fetched products to existing products
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
        toast.error("Error fetching recentlyViewedProducts");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  const categories = [
    {
      name: "Automobiles",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/car.png",
    },
    {
      name: "Motorcycle",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/motorbike.png",
    },
    {
      name: "Technology",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/cpu.png",
    },
    {
      name: "Accessories",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/watch.png",
    },
    {
      name: "Books, magazines",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/book.png",
    },
    {
      name: "Home furniture",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/sofa.png",
    },
    {
      name: "Toys for kids",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/toy.png",
    },
    {
      name: "Clothings",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/shirt.png",
    },
    {
      name: "Musical equipments",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/music.png",
    },
    {
      name: "Sport, health",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/ball.png",
    },
    {
      name: "Jewellery",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/diamond.png",
    },
    {
      name: "Animals, birds",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/animal.png",
    },
    {
      name: "Other",
      imageSrc:
        "https://bootstrap-ecommerce-web.netlify.app/images/icons/category-png-gray/ball.png",
    },
  ];

  return (
    <>
      <Header/>
      <Sidebar />

      <section className="mt-20 md:ml-64 px-2">
        <section className="padding-top-sm">
          <div className="container mx-auto sm:px-4">
            <article className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
              <img
                src="https://bootstrap-ecommerce-web.netlify.app/images/banners/interior-wide.jpg"
                className="w-full"
              />
            </article>
          </div>
        </section>

        <section className="padding-top">
          <div className="container mx-auto sm:px-4">
            <header className="mb-4">
              <h3>Popular categories</h3>
            </header>
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
            <header className="mb-4 flex justify-between">
              <h3 className="inline-block text-lg pl-2">Latest Deals</h3>
              <button className="text-xs md:text-sm bg-gray-200 rounded-lg px-2" onClick={() => {navigate(`/category/latest`)}}>Show more</button>
            </header>

            <ProductsList products={products} />
          </div>
        </section>

        <section className="padding-top-sm">
          <div className="container mx-auto sm:px-4">
            <header className="mb-4 flex justify-between">
              <h3 className="inline-block text-lg pl-2">You recently looked</h3>
              <button className="text-xs md:text-sm bg-gray-200 rounded-lg px-2" onClick={()=>navigate('/category/recentlyviewed')}>Show more</button>
            </header>

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
                    <img
                      className="rounded w-full"
                      src="https://bootstrap-ecommerce-web.netlify.app/images/posts/1.jpg"
                      height={160}
                    />
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
                    <img
                      className="rounded w-full"
                      src="https://bootstrap-ecommerce-web.netlify.app/images/posts/2.jpg"
                      height={160}
                    />
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
                    <img
                      className="rounded w-full"
                      src="https://bootstrap-ecommerce-web.netlify.app/images/posts/3.jpg"
                      height={160}
                    />
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
                    <img
                      className="rounded w-full"
                      src="https://bootstrap-ecommerce-web.netlify.app/images/posts/4.jpg"
                      height={160}
                    />
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
