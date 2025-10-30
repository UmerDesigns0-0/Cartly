import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Qualities() {
  const qualities = [
    {
      title: "User Experience (UX)",
      para: "From browsing to purchase in three hassle-free & simple steps.",
      imgURL:
        "https://cdn.pixabay.com/photo/2025/08/13/18/49/mountains-9772732_1280.png",
    },
    {
      title: "Product Variety & Curation",
      para: "Discover unique, high-rated products without the clutter.",
      imgURL:
        "https://cdn.pixabay.com/photo/2024/12/27/19/25/flower-9294773_960_720.png",
    },
    {
      title: "Customer Support",
      para: "24/7 support ensuring your Cartly shopping journey is stress-free.",
      imgURL:
        "https://cdn.pixabay.com/photo/2018/04/04/14/34/leaves-3289964_1280.png",
    },
  ];

  return (
    <div className="mx-auto mb-8 px-2">
      <Swiper
        modules={[Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
         }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 26 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {qualities.map((quality, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col mx-auto lg:flex-row items-center gap-4 bg-slate-200 rounded-md p-4 text-center lg:text-left">
              {/* Text */}
              <div className="flex-1 order-2 lg:order-1">
                <h1 className="text-lg font-semibold mb-2">{quality.title}</h1>
                <p className="text-sm text-gray-500">{quality.para}</p>
              </div>

              {/* Image */}
              <div className="flex-shrink-0 order-1 lg:order-2">
                <img
                  className="rounded-full w-32 h-32 object-cover hover:scale-105 transition duration-300"
                  src={quality.imgURL}
                  alt={quality.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="!mt-8 lg:hidden"></div>
      </Swiper>
    </div>
  );
}

export default Qualities;
