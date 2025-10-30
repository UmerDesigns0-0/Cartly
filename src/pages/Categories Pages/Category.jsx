import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Spinners from "../components/Spinners";
import { Link } from "react-router-dom";

function Category() {
  const { categoryId } = useParams();

  const [visible, setVisible] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  const showMoreItems = () => {
    setLoadingMore(true);

    setTimeout(() => {
      setVisible((prev) => prev + 8);
      setLoadingMore(false);
    }, 100);
  };

  const colors = [
    "bg-blue-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const colorMap = {
    "bg-blue-500": "text-blue-500",
    "bg-red-500": "text-red-500",
    "bg-green-500": "text-green-500",
    "bg-yellow-500": "text-yellow-500",
    "bg-purple-500": "text-purple-500",
    "bg-pink-500": "text-pink-500",
    "bg-indigo-500": "text-indigo-500",
    "bg-teal-500": "text-teal-500",
  };
  //   const textColors = (bgColor) => bgColor.replace("bg-", "text-");

  const {
    data: category = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category-products", categoryId],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${categoryId}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      const extendedColors = [];
      for (let i = 0; i < data.products.length; i++) {
        extendedColors.push(colors[i % colors.length]);
      }

      const shuffledColors = extendedColors.sort(() => Math.random() - 0.5);

      const productsWithColors = data.products
        .sort(() => Math.random() - 0.5)
        .map((product, index) => ({
          ...product,
          bgColor: shuffledColors[index],
        }));

      return productsWithColors;
    },
  });

  const renderProducts = (category || []).slice(0, visible);
  const hasMore = visible < category?.length;

  return (
    <div className="px-4 mt-4">
      <h3 className="text-2xl mt-2 px-10 font-semibold capitalize">
        {categoryId.replace("-", " ")}
      </h3>

      <div className="p-1 flex flex-wrap justify-center md:justify-start mx-auto max-w-[1200px] 2xl:max-w-[1500px] items-center">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Spinners type="rise" size={15} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-4">
            Error loading products.
          </p>
        ) : (
          renderProducts?.map((product) => {
            const title = product?.title || "";
            const brand = product?.brand || "";

            const shortTitle =
              title.length > 10 ? title.substring(0, 10) + ".." : title;

            const shortBrand =
              brand.length > 20 ? brand.substring(0, 20) + ".." : brand;

            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div
                  key={product.id}
                  className={`flex-shrink-0 m-6 relative overflow-hidden ${product.bgColor} rounded-lg shadow-lg`}
                >
                  {/* --- background SVG --- */}
                  <svg
                    className="absolute bottom-0 left-0 mb-8"
                    viewBox="0 0 375 283"
                    fill="none"
                    style={{ transform: "scale(1.5)", opacity: 0.1 }}
                  >
                    <rect
                      x="159.52"
                      y="175"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 159.52 175)"
                      fill="white"
                    />
                    <rect
                      y="107.48"
                      width="152"
                      height="152"
                      rx="8"
                      transform="rotate(-45 0 107.48)"
                      fill="white"
                    />
                  </svg>
                  {/* ---------------------- */}

                  <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div
                      className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                      style={{
                        background: "radial-gradient(black, transparent 60%)",
                        transform:
                          "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                        opacity: 0.2,
                      }}
                    ></div>

                    <img
                      className="relative select-none w-40 transform hover:scale-110 transition duration-500 ease-in-out"
                      draggable="false"
                      src={product?.thumbnail}
                      alt={product?.title}
                      title={product?.title}
                    />
                  </div>

                  <div className="relative text-white px-6 pb-6 mt-6">
                    {product?.brand && (
                      <span
                        title={product?.brand}
                        className="block text-sm opacity-75 mb-1"
                      >
                        {shortBrand}
                      </span>
                    )}
                    <div className="flex justify-between gap-4">
                      <span
                        title={product?.title}
                        className="block font-semibold text-md"
                      >
                        {shortTitle}
                      </span>
                      <span
                        className={`rounded-full bg-white text-xs font-bold px-3 py-1 leading-none flex items-center ${
                          colorMap[product?.bgColor]
                        }`}
                      >
                        ${product?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      {/* View More Button with Loading Spinner */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={showMoreItems}
            disabled={loadingMore}
            className="bg-white ring-1 ring-gray-300 hover:ring-0 hover:bg-slate-200 text-black cursor-pointer py-2 px-6 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              `View More (${category.length - renderProducts.length} remaining)`
            )}
          </button>
        </div>
      )}

      {/* Show total count */}
      {!isLoading && !error && (
        <div className="text-center text-sm text-gray-500 mt-4">
          Showing {renderProducts.length} of {category.length} Products
        </div>
      )}
    </div>
  );
}

export default Category;
