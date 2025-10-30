import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link } from "react-router-dom";

import Spinners from "../Spinners";

function WatchesCaro() {
  // const [loading, setLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["watches-products"],
    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/products/category/mens-watches"
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinners type="grid" size={15} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="px-4 lg:px-2 mt-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Discover Watches for Men
          </h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 2,
          }}
          loop={true}
          watchOverflow={true}
          spaceBetween={12}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {products.map((pro) => {
            const shortTitle =
              pro.title.length > 15
                ? pro.title.substring(0, 15) + ".."
                : pro.title;
            return (
              <SwiperSlide key={pro.id} className="h-auto">
                <Link to={`/product/${pro.id}`}>
                  <div className="flex flex-col h-full relative cursor-pointer rounded-lg shadow shadow-gray-400 overflow-hidden p-4">
                    <button className="absolute shadow-[inset_0_0_4px_rgba(0,0,0,0.1)] hover:shadow-[0] end-4 top-4 z-10 rounded-full p-1.5 text-gray-900 transition hover:text-red-600 hover:bg-red-100">
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

                    {/* Fixed height image container */}
                    <div className="flex items-center justify-center h-32 mb-2">
                      <img
                        src={pro.thumbnail}
                        alt={pro.title}
                        title={pro.title}
                        className="max-h-full w-auto rounded-lg hover:scale-105 duration-300 ease-in-out transition-all"
                      />
                    </div>

                    {/* Content that grows to fill space */}
                    <div className="flex-1 flex flex-col mt-2">
                      <p
                        title={pro.title}
                        className="text-sm text-gray-700 line-clamp-2 flex-1"
                      >
                        {shortTitle}
                      </p>
                      <p className="text-sm font-semibold mt-2">${pro.price}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className="!mt-10"></div>
        </Swiper>
      </div>
    </div>
  );
}

export default WatchesCaro;
