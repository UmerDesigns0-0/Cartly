import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link, useLocation } from "react-router-dom";

import Spinners from "../components/Spinners";

function Genres() {
  const location = useLocation();

  const { categories, title } = location.state || {};

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

  const {
    data: categoryList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", categories],
    queryFn: async () => {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const res = await fetch(
            `https://dummyjson.com/products/category/${cat}`
          );
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          const extendedColors = [];
          for (let i = 0; i < data.products.length; i++) {
            extendedColors.push(colors[i % colors.length]);
          }

          // shuffle colors randomly
          const shuffledColors = extendedColors.sort(() => Math.random() - 0.5);

          // attach random bg colors
          const productsWithColors = data.products.map((product, index) => ({
            ...product,
            bgColor: shuffledColors[index],
          }));

          return { name: cat, products: productsWithColors };
        })
      );
      return results;
    },
  });

  return (
    <div className="mt-4 px-8 mx-auto pb-6 lg:pb-12">
      <h1 className="text-2xl mt-2 font-bold mb-4">{title}</h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinners type="rise" size={15} />
        </div>
      ) : error ? (
        <p>Error loading categories</p>
      ) : (
        categoryList.map((cat) => (
          <div key={cat.name} className="mb-4 pt-2">
            <div className="flex justify-between mt-2 px-2">
              <h2 className="text-xl font-semibold mb-4 capitalize px-2">
                {cat.name.replace("-", " ")}
              </h2>
              <Link to={`/category/${cat?.name}`}>
                <button className="group cursor-pointer text-orange-500 border border-orange-500 py-1 px-3 text-sm gap-1 rounded inline-flex items-center">
                  <span>View All</span>
                  <svg
                    className="w-4 h-6 ml-2 group-hover:translate-x-1 transition duration-300 ease-in-out"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </Link>
            </div>

            <Swiper
              modules={[Pagination, Scrollbar, Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 2,
              }}
              scrollbar={{
                draggable: true,
                el: ".swiper-scrollbar",
                hide: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {cat.products.map((product) => {
                const title = product?.title || "";
                const brand = product?.brand || "";

                const shortTitle =
                  title.length > 14 ? title.substring(0, 14) + ".." : title;

                const shortBrand =
                  brand.length > 20 ? brand.substring(0, 20) + ".." : brand;

                return (
                  <SwiperSlide key={product.id} className="h-auto">
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <div
                        key={product.id}
                        className={`flex-shrink-0 m-2 relative overflow-hidden ${product.bgColor} rounded-lg shadow-lg`}
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
                              background:
                                "radial-gradient(black, transparent 60%)",
                              transform:
                                "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                              opacity: 0.2,
                            }}
                          ></div>

                          <img
                            className="relative w-40 select-none transform hover:scale-110 transition duration-500 ease-in-out"
                            draggable="false"
                            src={product?.thumbnail}
                            alt={product?.title}
                            title={product?.title}
                          />
                        </div>

                        <div className="relative text-white px-6 pb-6 mt-6">
                          {product?.brand && (
                            <span
                              title={product.brand}
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
                                colorMap[product.bgColor]
                              }
                        }`}
                            >
                              ${product?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
              <div className="!mt-10 lg:hidden"></div>
            </Swiper>
          </div>
        ))
      )}
    </div>
  );
}

export default Genres;
