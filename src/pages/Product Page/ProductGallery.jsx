import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

function ProductGallery({ imgs }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="flex gap-4 cursor-grab active:cursor-grabbing">
      {/* Main product images */}
      <div className="flex-1 min-w-50">
        <Swiper
          loop={true}
          spaceBetween={32}
          effect={"fade"}
          fadeEffect={{
    crossFade: true  // Add this
  }}
          navigation
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs, Navigation, EffectFade]}
          className="product-prev "
        >
          {imgs?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Yellow Travel Bag ${index + 1}`}
                className="mx-auto select-none h-[350px] md:h-[480px] object-cover rounded-lg"
                draggable="false"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product thumbnails - VERTICAL on the left */}
      <div className="w-24 flex-shrink-0">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={12}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs, FreeMode]}
          breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          className="mx-auto h-[350px] md:h-[480px]"
        >
          {imgs?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="cursor-pointer select-none rounded-lg border-2 border-gray-200 transition-all duration-500 hover:border-orange-600 object-cover w-auto h-auto mt-1"
                draggable="false"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ProductGallery;
