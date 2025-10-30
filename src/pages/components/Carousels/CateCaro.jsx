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

function CateCaro({ activeTab, setActiveTab }) {
  const [loading, setLoading] = useState(true);
  // const [products, setProducts] = useState([]);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cate-products", activeTab],
    queryFn: async () => {
      const res = await fetch(
        `https://dummyjson.com/products/category/${activeTab}`
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return data.products;
    },
  });

  // useEffect(() => {
  //   let mounted = true; // Flag to check if component is still mounted
  //   const fetchCates = async () => {
  //     if (!activeTab) return; // no category selected
  //     try {
  //       setLoading(true); // Set loading at the start of fetch
  //       const res = await fetch(
  //         `https://dummyjson.com/products/category/${activeTab}`
  //       );
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       const data = await res.json();
  //       if (mounted) {
  //         setProducts(data.products);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       if (mounted) {
  //         setProducts([]); // Only update state if component is still mounted
  //       }
  //     } finally {
  //       if (mounted) {
  //         setLoading(false);
  //       }
  //     }
  //   };
  //   fetchCates();
  //   return () => {
  //     mounted = false;
  //   };
  // }, [activeTab]);

  if (!activeTab) return null;

  return (
    <>
      <div>
        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Spinners type="prop" loading={loading} size={15} />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Error: {error.message}</p>
          ) : (
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
                  <Link
                    onClick={() => setActiveTab(null)}
                    to={`/product/${pro.id}`}
                  >
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
          )}
        </div>
      </div>
    </>
  );
}

export default CateCaro;
