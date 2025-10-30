import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import Spinners from "../Spinners";

function ColoredCards() {
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
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["furniture-products"], // unique cache key
    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/products/category/furniture"
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      // same color shuffle logic
      const extendedColors = [];
      for (let i = 0; i < data.products.length; i++) {
        extendedColors.push(colors[i % colors.length]);
      }
      const shuffledColors = extendedColors.sort(() => Math.random() - 0.5);

      return data.products
        .sort(() => Math.random() - 0.5)
        .map((product, index) => ({
          ...product,
          bgColor: shuffledColors[index],
        }));
    },
  });

  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinners type="rise" loading={isLoading} size={15} />
      </div>
    );
  }

  // Error handling
  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  // Data render
  return (
    <div className="mt-2 px-2 ml-0 mx-auto pb-6 lg:pb-12">
      <Swiper
        modules={[Pagination, Scrollbar]}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true, el: ".swiper-scrollbar", hide: false }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 26 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
      >
        {products.map((product) => {
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

                <div className="w-full aspect-square mb-2 hover:scale-[1.03] transition-transform duration-300">
                  <img
                    loading="lazy"
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-sm"
                    title={product.title}
                  />
                </div>

                <div className="flex-1 flex flex-col px-2">
                  <p className="text-xs text-gray-500 font-medium">Colors</p>
                  <div className="mt-1.5 flex gap-1">
                    <span className="block size-4 rounded-full bg-gray-500"></span>
                    <span className="block size-4 rounded-full bg-blue-500"></span>
                    <span className="block size-4 rounded-full bg-pink-500"></span>
                    <span className="block size-4 rounded-full bg-green-500"></span>
                    <span className="block size-4 rounded-full bg-yellow-500"></span>
                  </div>

                  <div className="mt-auto pt-3 text-sm">
                    <h3
                      title={product.title}
                      className="cardtxt text-gray-900 text-sm"
                    >
                      {shortTitle}
                      <span className="undlCard"></span>
                    </h3>
                    <p className="text-gray-900 text-sm font-semibold mt-1">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
        <div className="!mt-8 lg:hidden"></div>
      </Swiper>
    </div>
  );
}

export default ColoredCards;
