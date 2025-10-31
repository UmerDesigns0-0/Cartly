import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link } from "react-router-dom";

import Spinners from "../components/Spinners";

function RelatedProducts({ category, currentId }) {
  const colors = [
    "bg-blue-300",
    "bg-red-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-indigo-300",
    "bg-teal-300",
  ];

  const {
    data: relatedProducts = [],
    isLoading,
    error,
  } = useQuery({
    ueryKey: ["relatedProducts", category, currentId],
    queryFn: async () => {
      if (!category) return [];
      const res = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      const filterCurrentId = data.products.filter(
        (product) => product.id !== currentId
      );

      const extendedColors = [];
      for (let i = 0; i < filterCurrentId.length; i++) {
        extendedColors.push(colors[i % colors.length]);
      }

      const shuffledColors = extendedColors.sort(() => Math.random() - 0.5);

      const productsWithColors = filterCurrentId
        .sort(() => Math.random() - 0.5)
        .map((product, index) => ({
          ...product,
          bgColor: shuffledColors[index],
        }));

      return productsWithColors;
    },
  });
  
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 px-2 mx-auto pb-6 lg:pb-12">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinners type="rise" size={15} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : (
        <Swiper
          modules={[Pagination, Scrollbar]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          watchOverflow={true}
          centeredSlides={false}
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
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {relatedProducts.map((product) => {
            // Calculate short title inside the map function
            const shortTitle =
              product.title.length > 20
                ? product.title.substring(0, 20) + ".."
                : product.title;

            return (
              <SwiperSlide key={product.id} className="h-auto">
                <Link
                  to={`/product/${product.id}`}
                  className={`flex flex-col w-full h-full relative group p-3 rounded-sm ${product.bgColor}`}
                >
                  <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-red-600 hover:bg-red-100">
                    <span className="sr-only">Wishlist</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                  {/* <button className="absolute start-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-orange-600 hover:bg-orange-100">
                    <span className="sr-only">cart</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button> */}

                  {/* Image container with fixed aspect ratio */}
                  <div className="w-full aspect-square mb-2 hover:scale-[1.03] transition-transform duration-300">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-sm"
                      title={product.title}
                    />
                  </div>

                  {/* Content area that grows to fill remaining space */}
                  <div className="flex-1 flex flex-col px-2">
                    <p className="text-xs text-gray-500 font-medium">Colors</p>
                    <div className="mt-1.5 flex gap-1">
                      <span className="block size-4 rounded-full bg-gray-500 hover:transform hover:scale-115"></span>
                      <span className="block size-4 rounded-full bg-blue-500 hover:transform hover:scale-115"></span>
                      <span className="block size-4 rounded-full bg-pink-500 hover:transform hover:scale-115"></span>
                      <span className="block size-4 rounded-full bg-green-500 hover:transform hover:scale-115"></span>
                      <span className="block size-4 rounded-full bg-yellow-500 hover:transform hover:scale-115"></span>
                    </div>

                    {/* Push title and price to bottom */}
                    <div className="mt-auto pt-3 text-sm">
                      <h3
                        title={product.title}
                        className="cardtxt text-gray-900 text-sm"
                      >
                        {shortTitle}
                        <span className="undlCard"></span>
                      </h3>
                      <p className="text-gray-900 text-sm font-semibold mt-1 hover:opacity-90">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}

          {/* Pagination that only shows on mobile/tablet */}
          <div className="mt-10 lg:hidden"></div>

          {/* Optional: Scrollbar */}
          {/* <div className="swiper-scrollbar mt-4 hidden lg:block"></div> */}
        </Swiper>
      )}
    </div>
  );
}

export default RelatedProducts;
