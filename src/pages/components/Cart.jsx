import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = forwardRef(({ onClose, className = "" }, ref) => {
  const [quantities, setQuantities] = useState({});
  const { cart, updateQuantity, removeItem, goToCheckout } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    goToCheckout(cart);
    navigate("/Checkout");
    onClose();
  };

  useEffect(() => {
    // Initialize AOS only if not already initialized
    if (!AOS.initialized) {
      AOS.init({
        duration: 300,
        once: true,
      });
    }
  }, []);

  useEffect(() => {
    // Sync quantities with cart
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (e, itemId) => {
    const value = e.target.value;

    if (value === "") {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: "",
      }));
      return;
    }

    const num = parseInt(value, 10);

    if (!isNaN(num) && num >= 0 && num <= 999) {
      const newQuantities = {
        ...quantities,
        [itemId]: num, // Update the quantity for the specific item
      };
      setQuantities(newQuantities);
      updateQuantity(itemId, num); // Update cart context immediately
    }
  };

  const handleQuantityBlur = (itemId) => {
    let value = quantities[itemId];

    if (value === "" || value < 1) value = 1;
    if (value > 999) value = 999;

    setQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));

    updateQuantity(itemId, value);
  };

  const handleDirectQuantityChange = (newQuantity, itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
    updateQuantity(itemId, newQuantity);
  };

  return (
    <>
      <div
        ref={ref}
        data-aos="fade-up"
        data-aos-easing="linear"
        className={`bg-slate-50 ring-1 ring-slate-200 w-80 md:w-90 lg:w-96 rounded-lg shadow-lg p-4 ${className}`}
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute end-4 top-4 text-gray-600 hover:text-gray-500 transition hover:scale-110"
        >
          <span className="sr-only">Close cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4 space-y-6">
          <ul className="space-y-4 max-h-[calc(60vh-12rem)] md:max-h-[calc(80vh-12rem)] overflow-y-scroll p-0 md:p-3">
            {cart.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => {
                const shortTitle =
                  item?.title.length > 20
                    ? item?.title.slice(0, 20) + "..."
                    : item?.title;

                return (
                  <li key={item.id} className="flex items-center gap-4">
                    <Link to={`/product/${item?.id}`}>
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        title={item?.title}
                        className="size-16 rounded-sm object-cover hover:transform hover:scale-110 duration-300 ease-in-out"
                      />
                    </Link>

                    <div>
                      <Link to={`/product/${item?.id}`}>
                        <h3
                          className="text-sm text-gray-900 hover:underline underline-offset-2"
                          title={item?.title}
                        >
                          {shortTitle} {/* Now using the shortTitle */}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-600">${item?.price}</p>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div className="flex items-center space-x-1">
                        {/* Decrease button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDirectQuantityChange(
                              Math.max((quantities[item?.id] ?? 1) - 1, 1),
                              item?.id
                            )
                          }
                          className="group flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-3 group-hover:text-gray-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14"
                            />
                          </svg>
                        </button>

                        {/* Input field */}
                        <input
                          type="number"
                          min={0}
                          max={999}
                          value={quantities[item.id] ?? 1}
                          onChange={(e) => handleQuantityChange(e, item.id)}
                          onBlur={() => handleQuantityBlur(item.id)}
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key))
                              e.preventDefault();
                          }}
                          className="h-8 w-12 rounded border border-gray-300 bg-white text-center text-sm text-gray-700 focus:outline-none 
                                     [-moz-appearance:textfield] 
                                     [&::-webkit-inner-spin-button]:appearance-none 
                                     [&::-webkit-outer-spin-button]:appearance-none"
                        />

                        {/* Increase button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDirectQuantityChange(
                              Math.min((quantities[item?.id] ?? 1) + 1, 999),
                              item?.id
                            )
                          }
                          className="group flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3 group-hover:text-gray-900"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item?.id)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>

          <div className="space-y-4 text-center">
            <Link
              to={"/CartPage"}
              onClick={onClose}
              className="block w-full rounded-sm border border-orange-600 px-5 py-3 text-sm text-orange-600 transition hover:ring-1 hover:font-medium  hover:ring-orange-600"
            >
              View my cart ({cart.length})
            </Link>

            <button
              onClick={handleCheckOut}
              className="block w-full rounded-sm bg-orange-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-orange-600"
            >
              Checkout
            </button>

            <Link
              to={"/"}
              onClick={onClose}
              className="inline-block font-medium text-sm text-orange-500 underline underline-offset-4 transition hover:text-orange-600"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export default Cart;
