import { Link, useNavigate } from "react-router-dom";

import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProductDetails({ count, setCount, product }) {
  const handleCount = (type) => {
    if (type === "inc" && count < 999) {
      setCount(count + 1);
    } else if (type === "dec") {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };

  const navigate = useNavigate();

  const handleBuyNow = () => {
    const CheckoutItem = {
      id: product?.id,
      title: product?.title,
      price: product?.price,
      thumbnail: product?.thumbnail,
      quantity: count || 1,
    };
    goToCheckout(CheckoutItem);
    navigate("/checkout");
  };

  const [cartAnimation, setCartAnimation] = useState(false);

  const { addToCart, goToCheckout } = useContext(CartContext);

  return (
    <>
      <div className="w-full flex flex-col  order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
        <p className="font-medium w-fit text-lg capitalize text-orange-500 hover:text-orange-600 cursor-pointer mb-2">
          {/* Travel &nbsp;/&nbsp; Menswear */}
          <Link to={`/category/${product?.category}`}>
            {product?.category.replace(/-/g, " ") || ""}
          </Link>
        </p>
        {/* Tags */}
        <Link to={`/category/${product?.category}`} className="w-fit">
          <div className="flex gap-2">
            {product?.tags?.map((tag, i) => (
              <p
                key={i}
                className="mb-2 text-sm py-1 px-4 bg-slate-200 hover:bg-slate-300 rounded-full text-center"
              >
                {tag}
              </p>
            ))}
          </div>
        </Link>
        <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
          {product?.title || "Title Not Found"}
        </h2>
        <div className="flex gap-6 items-center">
          <div className="flex gap-3">
            <h3 className="font-medium text-2xl">${product?.price}</h3>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-600 line-through text-2xl">
                {product?.discountPrice ? `${product.discountPrice}% Off` : ""}
              </h3>
              <span className="text-orange-500 text-md font-medium">
                {product?.discountPercentage
                  ? `${product.discountPercentage.toFixed(0)}% Off`
                  : ""}
              </span>
            </div>
          </div>
          {/* Rating */}
          <div>
            <button className="flex items-center gap-1 rounded-lg bg-amber-400 py-1 px-2.5 w-max">
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12657_16865)">
                  <path
                    d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                    fill="white"
                  />
                  <g clipPath="url(#clip1_12657_16865)">
                    <path
                      d="M8.10326 2.26718C8.47008 1.52393 9.52992 1.52394 9.89674 2.26718L11.4124 5.33818C11.558 5.63332 11.8396 5.83789 12.1653 5.88522L15.5543 6.37768C16.3746 6.49686 16.7021 7.50483 16.1086 8.08337L13.6562 10.4738C13.4205 10.7035 13.313 11.0345 13.3686 11.3589L13.9475 14.7343C14.0877 15.5512 13.2302 16.1742 12.4966 15.7885L9.46534 14.1948C9.17402 14.0417 8.82598 14.0417 8.53466 14.1948L5.5034 15.7885C4.76978 16.1742 3.91235 15.5512 4.05246 14.7343L4.63137 11.3589C4.68701 11.0345 4.57946 10.7035 4.34378 10.4738L1.89144 8.08337C1.29792 7.50483 1.62543 6.49686 2.44565 6.37768L5.8347 5.88522C6.16041 5.83789 6.44197 5.63332 6.58764 5.33818L8.10326 2.26718Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_12657_16865">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                  <clipPath id="clip1_12657_16865">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-sm font-medium text-white">
                {product?.rating ? product.rating.toFixed(1) : "N/A"}
              </span>
            </button>
          </div>
          <p
            className={`text-sm font-medium ${
              product?.availabilityStatus === "In Stock"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product?.availabilityStatus}
          </p>
        </div>

        <p className="my-5 text-sm text-gray-600">
          {product?.description || "Description Not Added"}
        </p>

        {/* Colors */}

        <div className="block w-full">
          <p className="font-medium text-lg leading-8 text-gray-900 mb-4">
            Colors
          </p>
          <div className="text">
            <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6 ">
              <button
                data-ui="checked active"
                className="p-1.5 border border-gray-200 rounded-lg transition-all duration-300 hover:border-emerald-500 focus-within:border-emerald-500"
              >
                <svg
                  className="bg-emerald-500 rounded-sm"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <circle cx="20" cy="20" r="20" fill="" /> */}
                </svg>
              </button>
              <button
                data-ui="checked active"
                className="p-1.5 border border-gray-200 rounded-lg transition-all duration-300 hover:border-yellow-500 focus-within:border-yellow-500"
              >
                <svg
                  className="bg-yellow-500 rounded-sm"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <circle cx="20" cy="20" r="20" fill="" /> */}
                </svg>
              </button>
              <button
                data-ui="checked active"
                className="p-1.5 border border-gray-200 rounded-lg transition-all duration-300 hover:border-blue-500 focus-within:border-blue-500"
              >
                <svg
                  className="bg-blue-500 rounded-sm"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <circle cx="20" cy="20" r="20" fill="" /> */}
                </svg>
              </button>
              <button
                data-ui="checked active"
                className="p-1.5 border border-gray-200 rounded-lg transition-all duration-300 hover:border-red-500 focus-within:border-red-500"
              >
                <svg
                  className="bg-red-500 rounded-sm"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <circle cx="20" cy="20" r="20" fill="" /> */}
                </svg>
              </button>
              <button
                data-ui="checked active"
                className="p-1.5 border border-gray-200 rounded-lg transition-all duration-300 hover:border-lime-500 focus-within:border-lime-500"
              >
                <svg
                  className="bg-lime-500 rounded-sm"
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <circle cx="20" cy="20" r="20" fill="" /> */}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dimentions */}
        <div className="block w-full mb-6">
          <p className="font-medium text-lg leading-8 text-gray-900 mb-4">
            Dimentions
          </p>
          <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-4">
            <button className="border border-gray-200 text-gray-900 text-sm py-1.5 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">
              {product.dimensions?.height} (Height)
            </button>
            <button className="border border-gray-200 text-gray-900 text-sm py-1.5 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">
              {product.dimensions?.width} (Width)
            </button>
            <button className="border border-gray-200 text-gray-900 text-sm py-1.5 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">
              {product.dimensions?.depth} (Depth)
            </button>
          </div>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-3 mb-8">
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => handleCount("dec")}
              className="group py-2 px-4 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
            >
              <svg
                className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 11H5.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M16.5 11H5.5"
                  stroke=""
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M16.5 11H5.5"
                  stroke=""
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <input
              type="number"
              min={0}
              max={999}
              value={count}
              onChange={(e) => {
                const value = e.target.value;

                // Allow empty input
                if (value === "") {
                  setCount("");
                  return;
                }

                // Allow number input
                const num = parseInt(value, 10);

                // Only update if it's a valid number within range
                if (!isNaN(num) && num >= 0 && num <= 999) {
                  setCount(num);
                }
              }}
              onBlur={() => {
                // Normalize on blur
                if (count === "" || count < 0) setCount(0);
                if (count > 999) setCount(999);
              }}
              onKeyDown={(e) => {
                // Prevent 'e', '+', '-' characters in number input
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className="font-semibold text-gray-900 text-lg py-[5px] px-4 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              onClick={() => handleCount("inc")}
              className="group py-2 px-4 border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
            >
              <svg
                className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 5.5V16.5M16.5 11H5.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M11 5.5V16.5M16.5 11H5.5"
                  stroke=""
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M11 5.5V16.5M16.5 11H5.5"
                  stroke=""
                  strokeOpacity="0.2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              addToCart(product, count);
              setCartAnimation(true);
            }}
            className="group py-2 px-5 rounded-full cursor-pointer bg-orange-100 text-orange-600 font-semibold text-md w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-orange-200 hover:shadow-orange-200"
          >
            <svg
              className={`stroke-orange-600 transition-all duration-500 ${
                cartAnimation ? "animate-cart-bump" : ""
              }`}
              onAnimationEnd={() => setCartAnimation(false)}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                stroke=""
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Add to cart
          </button>
        </div>
        <div className="flex items-start gap-3 md:gap-10">
          <button className="group cursor-pointer transition-all duration-500 p-3 rounded-full bg-orange-100 hover:bg-orange-200 hover:shadow-sm hover:shadow-orange-300">
            <svg
              className="stroke-orange-600 transition-all duration-500"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                strokeWidth="1.6"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="w-full">
            <button
              onClick={handleBuyNow}
              className="text-center active:scale-90 cursor-pointer w-full px-5 py-3 rounded-full bg-orange-600 flex items-center justify-center font-semibold text-md text-white shadow-sm transition-all duration-500 hover:bg-orange-700 hover:shadow-orange-400"
            >
              Buy Now
            </button>
            <p className="px-4 font-medium text-sm md:text-[12px] mt-1 text-gray-600">
              {product?.shippingInformation}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
