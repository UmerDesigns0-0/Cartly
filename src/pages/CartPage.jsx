import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

function CartPage() {
  const {
    cart,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    tax,
    total,
    goToCheckout,
  } = useContext(CartContext);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const initialValue = {};
    cart.forEach((item) => {
      initialValue[item.id] = item.quantity || 1;
    });
    setQuantities(initialValue);
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
      const newQuantities = { ...quantities, [itemId]: num };
      setQuantities(newQuantities);
      updateQuantity(itemId, num);
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

  const navigate = useNavigate();
  const handleCheckOut = () => {
    goToCheckout(cart);
    navigate("/Checkout");
  }

  return (
    <>
      <div className="mx-auto px-8 py-4 mb-4">
        <h1 className="text-xl font-semibold text-slate-900">My Cart</h1>
        <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 && (
              <p className="text-center text-md my-10 font-semibold text-slate-600">
                Your Cart is Empty
              </p>
            )}
            {cart.map((item) => (
              <div
                key={item?.id}
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200"
              >
                <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
                  <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                    <Link to={`/product/${item?.id}`}>
                      <img
                        src={item?.thumbnail}
                        draggable="false"
                        className="w-full select-none h-full object-contain cursor-pointer transform hover:scale-110 duration-300 ease-in-out"
                        alt={item?.title}
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Link to={`/product/${item?.id}`}>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 hover:underline underline-offset-3">
                          {item?.title}
                        </h3>
                      </Link>
                      <p className="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2 gap-x-3">
                        <span className="text-sm">
                          Qty: {item?.quantity || 1}
                        </span>
                        <span
                          className={`text-sm ${
                            item?.availabilityStatus === "In Stock"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item?.availabilityStatus}
                        </span>
                      </p>
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-sm font-semibold text-slate-900">
                        ${item?.price}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex flex-col">
                  <div className="flex items-start gap-4 justify-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-pink-600 inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>

                    <svg
                      onClick={() => removeItem(item?.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() =>
                        handleDirectQuantityChange(
                          Math.max((quantities[item?.id] ?? 1) - 1, 1),
                          item?.id
                        )
                      }
                      type="button"
                      className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={999}
                      value={quantities[item?.id] ?? 1}
                      onChange={(e) => handleQuantityChange(e, item?.id)}
                      onBlur={() => handleQuantityBlur(item?.id)}
                      onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key))
                          e.preventDefault();
                      }}
                      className="h-8 w-8 rounded border border-gray-300 bg-white text-center text-sm text-gray-700 focus:outline-none 
                                     [-moz-appearance:textfield] 
                                     [&::-webkit-inner-spin-button]:appearance-none 
                                     [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <button
                      onClick={() =>
                        handleDirectQuantityChange(
                          Math.min((quantities[item?.id] ?? 1) + 1, 999),
                          item?.id
                        )
                      }
                      type="button"
                      className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>

          <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
            <ul className="text-slate-500 font-medium space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <div className="flex flex-col flex-1">
                  <span className="ml-auto font-semibold text-slate-900">
                    ${cart.length === 0 ? 0 : shipping.toFixed(2)}
                  </span>
                  <span className="text-[10px] ml-auto">
                    Free Shipping over $5000
                  </span>
                </div>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-semibold text-slate-900">
                  ${tax.toFixed(2)}
                </span>
              </li>
              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                Total{" "}
                <span className="ml-auto">
                  ${cart.length === 0 ? 0 : total.toFixed(2)}
                </span>
              </li>
            </ul>
            <div className="mt-8 space-y-4">
              <button
                onClick={handleCheckOut}
                type="button"
                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md cursor-pointer"
              >
                Buy Now
              </button>
              <Link to="/">
                <button
                  type="button"
                  className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 text-slate-900 border border-gray-300 rounded-md cursor-pointer"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <img
                draggable="false"
                src="https://readymadeui.com/images/master.webp"
                alt="card1"
                className="w-10 object-contain select-none"
              />
              <img
                draggable="false"
                src="https://readymadeui.com/images/visa.webp"
                alt="card2"
                className="w-10 object-contain select-none"
              />
              <img
                draggable="false"
                src="https://readymadeui.com/images/american-express.webp"
                alt="card3"
                className="w-10 object-contain select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
