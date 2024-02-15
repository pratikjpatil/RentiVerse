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
  const [itemsInCart, setItmesInCart] = useState(1);

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
      setReload((prev)=>!prev);
      setIsLoading(false);
    }
  };

  // const cartEdit = (operation) => {
  //   if (operation === "-") {
  //     setItmesInCart((prev) => {
  //       if (prev > 1) {
  //         return prev - 1;
  //       } else {
  //         return prev;
  //       }
  //     });
  //   } else if (operation === "+") {
  //     setItmesInCart((prev) => {
  //       if (prev < product.productQuantity) {
  //         return prev + 1;
  //       } else {
  //         return prev;
  //       }
  //     });
  //   }
  // };

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
    <div>
      <Header />
      <Sidebar />

      <main className="lg:flex md:mt-24 md:ml-72 lg:ml-96  sm:max-w-4xl md:max-w-full lg:max-w-4xl m-auto lg:gap-20 md:gap-14">
        <section className="relative md:w-3/4 lg:1/2 md:flex md:flex-col justify-center gap-6">
          <div className="aspect-[6/5] whitespace-nowrap snap-x snap-mandatory overflow-y-hidden sm:rounded-3xl">
            <div className={`inline-block snap-center`}>
              <img
                className="aspect-[6/5] object-cover"
                src={product.productImages[focusedIndex].secure_url}
                alt="shoe"
              />
            </div>
          </div>

          <div className="hidden md:flex justify-between max-w-full">
            <img
              src={product.productImages[0].secure_url}
              className={`md:aspect-square lg:w-20 md:w-20 rounded-3xl ${
                focusedIndex === 0 ? focusedStyling : ""
              } cursor-pointer hover:opacity-60 `}
              alt="shoe"
              tabIndex={0}
              onFocus={() => {
                shiftFocus(0);
              }}
            />
            <img
              src={product.productImages[1].secure_url}
              className={`md:aspect-square lg:w-20 md:w-20 rounded-3xl ${
                focusedIndex === 1 ? focusedStyling : ""
              } cursor-pointer hover:opacity-60`}
              alt="shoe thumbnail"
              tabIndex={1}
              onFocus={() => {
                shiftFocus(1);
              }}
            />
            <img
              src={product.productImages[2].secure_url}
              className={`md:aspect-square lg:w-20 md:w-20 rounded-3xl ${
                focusedIndex === 2 ? focusedStyling : ""
              } cursor-pointer hover:opacity-60`}
              alt="shoe thumbnail"
              tabIndex={2}
              onFocus={() => {
                shiftFocus(2);
              }}
            />
            <img
              src={product.productImages[3].secure_url}
              className={`md:aspect-square lg:w-20 md:w-20 rounded-3xl ${
                focusedIndex === 3 ? focusedStyling : ""
              } cursor-pointer hover:opacity-60`}
              alt="shoe thumbnail"
              tabIndex={3}
              onFocus={() => {
                shiftFocus(3);
              }}
            />
          </div>

          <div className="absolute top-1/2 flex justify-between w-full  px-5 md:hidden">
            <span
              className="aspect-square w-8 flex items-center justify-center bg-white rounded-full"
              onClick={scrollRight}
            >
              <img
                src="/images/icon-previous.svg"
                alt="next button"
                className="w-2"
              />
            </span>
            <span
              className="aspect-square w-8 flex items-center justify-center bg-white rounded-full"
              onClick={scrollLeft}
            >
              <img
                src="/images/icon-next.svg"
                alt="previous button"
                className="w-2"
              />
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-4 p-5 md:w-full lg:gap-4 lg:justify-center">
          <div className="flex flex-col gap-2 lg:gap-4">
            <span className="text-sm tracking-widest text-O kumbhB">
              {product.ownerName}
            </span>
            <span className="text-3xl text-VDB kumbhB lg:text-4xl">
              {product.productName}
            </span>
            <p className="text-base text-DGB kumbhS">
              {product.productDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 kumbhB lg:gap-6">
            <div className="flex justify-between items-center gap-3 flex-col lg:items-start">
              <span className="flex items-center gap-3 text-2xl">
                {product.productPrice} ₹
              </span>
              {/* <span className="text-GB">
                Available Quantity: {product.productQuantity}
              </span> */}
            </div>
            {/* <div className="flex flex-col gap-3 lg:flex-row ">
              <button className="flex justify-between bg-LGB p-4 items-center rounded-xl lg:gap-6 cursor-default">
                <img
                  src="/images/icon-plus.svg"
                  alt="add shoes button"
                  className="cursor-pointer hover:opacity-50"
                  onClick={() => {
                    cartEdit("+");
                  }}
                />
                {itemsInCart}
                <img
                  src="/images/icon-minus.svg"
                  alt="reduce shoes button"
                  className="cursor-pointer hover:opacity-50"
                  onClick={() => {
                    cartEdit("-");
                  }}
                />
              </button>
            </div> */}

            <form
              onSubmit={formSubmissionHandler}
              className="flex justify-between items-center gap-3 flex-col lg:items-start"
            >
              <div className="" htmlFor="till-date">
                Availability Till:{" "}
                <span className="">{product.dueDate.split("T")[0]}</span>
              </div>

              <label className="" htmlFor="till-date">
                Due Date:
              </label>
              <input
                className="w-2/3 px-4 border-2 rounded-lg"
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

              <label className="" htmlFor="message">
                Message:
              </label>
              <textarea
                type="text"
                className="px-4 border border-slate-300 rounded-xl"
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
                className="flex md:mt-5 justify-center gap-2 text-white hover:text-black bg-O bg-orange-400 hover:bg-orange-300 p-2 items-center rounded-2xl shadow-2xl shadow-O lg:w-content lg:shadow-Op"
              >
                <img
                  src="/images/icon-cart.svg"
                  alt="cart icon"
                  className="grayscale hover:invert brightness-0"
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
    </div>
  );
}

export default ProductPage;
