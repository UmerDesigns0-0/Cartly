import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link } from "react-router-dom";

import Spinners from "../Spinners";

function GroceryCaro() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["grocery-products"],
    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/products/category/groceries"
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinners type="prop" size={15} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <>
      <div>
        <div className="px-4 lg:px-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Find groceries you need
            </h2>
            <p className="text-sm text-gray-600">
              Fresh produce, meats, dairy, and more
            </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            navigation
            spaceBetween={2}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {products.map((pro) => (
              <SwiperSlide key={pro.id}>
                <Link to={`/product/${pro.id}`}>
                  <div className="CateCaro">
                    <div className="CateCaro-img">
                      <img
                        src={pro.thumbnail}
                        alt={pro.title}
                        className="CateCaro-img-inner"
                      />
                    </div>
                    <p className="CateCaro-txt">{pro.title}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default GroceryCaro;
