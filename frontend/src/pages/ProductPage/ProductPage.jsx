// ProductPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header, Sidebar } from "../../components";
import toast from "react-hot-toast";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({
    dueDate: "",
    message: "",
  });

  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();
  const focusedStyling = "border-4 border-O opacity-50";

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/product/product-info/${productId}`
        );

        if (result.status === 200) {
          setProduct(result.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Product not found");
        } else {
          toast.error(error.response.data.message);
        }
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    getProductInfo();
  }, [reload]);

  const formSubmissionHandler = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");
    try {
      setIsLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (product.requestStatus === "notSent") {
        const result = await axios.post(
          `${backendUrl}/api/request/send/${productId}`,
          formData,
          { withCredentials: true }
        );

        if (result.status === 201) {
          toast.success("Product request sent", { id: toastId });
        }
      } else {
        toast.error("Already sent!", { id: toastId });
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      setReload((prev) => !prev);
      setIsLoading(false);
    }
  };

  const scrollRight = () => {
    setFocusedIndex((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return 3; //last index of image array
    });
  };

  const scrollLeft = () => {
    setFocusedIndex((prev) => {
      if (prev < 3) {
        return prev + 1;
      }
      return 0; //first index of image array
    });
  };

  const shiftFocus = (index) => {
    setFocusedIndex(index);
  };

  if (!product) {
    return (
      <div>
        <Header />
        <Sidebar />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Sidebar />

      {/* <main className="lg:flex lg:mt-24 md:ml-72 lg:ml-96 sm:max-w-4xl md:max-w-full lg:max-w-4xl mt-16 mx-auto lg:gap-10 md:gap-14"> */}
      <main className="flex flex-col lg:flex-row lg:mt-24 md:ml-72 lg:ml-96 sm:max-w-4xl md:max-w-full lg:max-w-4xl mt-16 mx-auto lg:gap-10 md:gap-14">
        {/* <section className="relative md:w-1/2 md:flex md:flex-col justify-center gap-6"> */}

        <section className="flex flex-col gap-4 p-5 md:w-full lg:gap-4 justify-center items-center">
          <div className="whitespace-nowrap snap-x snap-mandatory overflow-y-hidden rounded-3xl shadow-2xl shadow-orange-300 w-full max-w-96 md:max-w-none">
            <div className="relative flex justify-center h-72 md:h-96 snap-center border-t-2 rounded-3xl">
              <img
                className="h-full w-full max-w-96 md:max-w-none object-cover  rounded-3xl hover:object-scale-down"
                src={product.productImages[focusedIndex].secure_url}
                alt="Product"
              />
              <div className="absolute top-1/2 flex justify-between w-full px-2 md:hidden">
                <span
                  className="aspect-square w-8 flex items-center justify-center bg-white opacity-50 rounded-full"
                  onClick={scrollRight}
                >
                  <img
                    src="/images/icon-previous.svg"
                    alt="next button"
                    className="w-2"
                  />
                </span>
                <span
                  className="aspect-square w-8 flex items-center justify-center bg-white opacity-50 rounded-full"
                  onClick={scrollLeft}
                >
                  <img
                    src="/images/icon-next.svg"
                    alt="previous button"
                    className="w-2"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-between max-w-full">
            {product.productImages.map((image, index) => (
              <img
                key={index}
                src={image.secure_url}
                className={`aspect-square w-1/4 p-1 rounded-3xl ${
                  focusedIndex === index ? focusedStyling : ""
                } cursor-pointer hover:opacity-60`}
                alt={`Product thumbnail ${index}`}
                tabIndex={index}
                onFocus={() => {
                  shiftFocus(index);
                }}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 p-5 md:w-full lg:gap-4 lg:justify-center">
          <div className="flex justify-between items-center gap-3 flex-col lg:items-start">
            <span className="text-sm text-slate-600">
              Product owner:
              <span className="text-sm tracking-widest">
                {" "}
                {product.ownerName}
              </span>
            </span>
            <span className="text-2xl font-semibold lg:text-4xl">
              {product.productName}
            </span>
            <p className="text-sm text-slate-600">Product description:</p>
            <p className="text-base text-slate-700 text-center md:text-left">
              {product.productDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:gap-6">
            <div className="flex justify-between items-center gap-3 flex-col lg:items-start">
              <span className="flex items-center gap-3 text-slate-600 text-sm">
                Price:
                <span className="text-2xl text-orange-500 font-semibold">
                  {product.productPrice} ₹
                </span>
              </span>

              <span className="text-xs text-slate-400 text-center md:text-left">
                Price listed is per day. Charges will be adjusted based on the
                number of days rented.
              </span>
            </div>

            <form
              onSubmit={formSubmissionHandler}
              className="flex justify-between items-center gap-3 flex-col lg:items-start"
            >
              <div className="text-slate-600 text-sm" htmlFor="till-date">
                Availability Till:
                <span className="text-slate-700 text-base">
                  {" "}
                  {product.dueDate.split("T")[0]}
                </span>
              </div>

              <label className="text-sm text-slate-600" htmlFor="till-date">
                Your return Date:
              </label>
              <input
                className="w-48 px-4 border-2 rounded-lg"
                type="date"
                id="till-date"
                name="till-date"
                placeholder="DD/MM/YY"
                min={new Date().toISOString().split("T")[0]}
                max={product.dueDate.split("T")[0]}
                onChange={(e) => {
                  setFormData({ ...formData, dueDate: e.target.value });
                }}
                required
              />

              <label className="text-sm text-slate-600" htmlFor="message">
                Message:
              </label>
              <textarea
                type="text"
                className="px-4 w-72 border border-slate-300 text-slate-700 rounded-xl"
                placeholder="Add message for owner here"
                name="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                }}
                required
              />

              <button
                type="submit"
                className="flex text-sm md:mt-5 justify-center gap-2 text-white bg-orange-400 hover:bg-orange-500 active:bg-orange-700 p-2 items-center rounded-2xl shadow-2xl shadow-orange-400 lg:w-content"
              >
                <img
                  src="/images/icon-cart.svg"
                  alt="cart icon"
                  className="grayscale invert brightness-0"
                />
                {product.requestStatus === "pending"
                  ? "Request already sent"
                  : product.requestStatus === "accepted"
                  ? "Request already accepted"
                  : product.requestStatus === "rejected"
                  ? "Request rejected"
                  : "Send Request"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductPage;
