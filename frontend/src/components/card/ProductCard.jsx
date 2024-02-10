import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="col-xxl-3 xl:w-1/3 px-4 sm:w-1/2 w-full pb-4">
        <div
          className="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          onClick={() => navigate(`/product/${data.productId}`)}
        >
          <div>
            <img
              src={data.productImages[0].secure_url}
              alt="Product"
              className="md:h-60 w-full object-cover rounded-t-xl"
            />
            <div className="px-4 py-3 w-full">
              <span className="text-gray-400 mr-3 uppercase text-xs">
                {data.productCategory}
              </span>
              <p className="text-lg font-bold text-black truncate block capitalize">
                {data.productName}
              </p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-black cursor-auto my-3">
                  ₹ {data.productPrice}
                </p>
                <span>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">
                    per day
                  </p>
                </span>
                <div className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    className="bi bi-bag-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
