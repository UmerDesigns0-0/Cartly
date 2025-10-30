import { useState, useEffect } from "react";

import ProductDetails from "./ProductDetails";
import ProductGallery from "./ProductGallery";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

import { useParams } from "react-router-dom";
import Spinners from "../components/Spinners";

function ProductPage() {

  

  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const ProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    ProductData();
  }, [id]);

  return (
    <>
      <section className="py-6 relative">
        <div className="mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Spinners type="rise" loading={loading} size={25} />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {/* Product details */}
              <ProductDetails
                product={product}
                count={count}
                setCount={setCount}
              />

              {/* Product images */}
              <ProductGallery
                // imgs={
                //   product?.thumbnail
                //     ? [product.thumbnail, ...(product?.images || [])] // thumbnail first, then rest
                //     : product?.images || []
                // }
                imgs={product?.images}
              />
            </div>
          )}
        </div>
        {!loading && product && (
          <div className="px-6 mt-10">
            <p className="text-xl px-2 font-semibold mb-4">Related Products</p>
            <RelatedProducts
              category={product?.category}
              currentId={product?.id}
            />
          </div>
        )}
        {!loading && product && (
        <div className="px-6">
          <p className="text-xl px-2 font-semibold mb-4">Product Reviews</p>
          <div className="px-4">
            <ProductReviews reviews={product?.reviews} />
          </div>
        </div>)}
      </section>
    </>
  );
}

export default ProductPage;
