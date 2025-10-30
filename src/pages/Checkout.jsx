import { useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [items, setItems] = useState([]);
  const { checkoutItems, removeCheckoutItem, clearCheckout } =
    useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize local state with checkout items
    if (checkoutItems.length === 0) {
      navigate("/");
    } else {
      setItems(
        checkoutItems.map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      );
    }
  }, [checkoutItems, navigate]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);

    if (updatedItems.length === 0) {
      clearCheckout();
      navigate("/");
    } else {
      setItems(updatedItems);
      removeCheckoutItem(itemId);
    }
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal >= 5000 ? 0 : 5.0;
  const discount = 0.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <div className="bg-white sm:px-8 px-4 py-6">
        <div className="px-4 mx-auto">
          <div className="border-b border-gray-300 pb-4 mb-12">
            <h1 className="text-2xl text-orange-500 font-semibold">Checkout</h1>
          </div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  {items.length === 0 && (
                    <p className="text-center text-slate-500">
                      No items in checkout.
                    </p>
                  )}
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 max-sm:flex-col">
                      <div className="w-24 h-24 shrink-0 bg-orange-50 p-2 rounded-md">
                        <img
                          src={item.thumbnail}
                          className="w-full h-full object-contain"
                          alt={item.title}
                        />
                      </div>
                      <div className="w-full flex justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-slate-900">
                            {item.title}
                          </h3>
                          <p className="text-sm font-medium text-slate-500 mt-2">
                            Qty: x{item.quantity}
                          </p>
                          <h6 className="text-[12px] text-slate-900 font-medium mt-2">
                            {`$${item.price} ${
                              item.quantity > 1 ? "each" : ""
                            }`}
                          </h6>
                          <h6 className="text-[12px] text-slate-900 font-semibold">
                            {item.quantity > 1 &&
                              `$${(item.price * item.quantity).toFixed(
                                2
                              )} total`}
                          </h6>
                        </div>
                        <div className="flex flex-col justify-between items-end gap-4">
                          <div
                            onClick={() => removeItem(item.id)}
                            className="cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 fill-orange-500 transform hover:scale-110 inline cursor-pointer"
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
                          <div className="flex items-center border border-gray-300 text-slate-900 text-xs font-medium outline-0 bg-transparent rounded-md">
                            <span
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="cursor-pointer px-2.5 py-1.5 hover:bg-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-2.5 fill-current"
                                viewBox="0 0 124 124"
                              >
                                <path
                                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </span>
                            <input
                              type="number"
                              min={1}
                              max={999}
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 1;
                                // Clamp the value between 1 and 999
                                const clampedVal = Math.min(
                                  Math.max(val, 1),
                                  999
                                );
                                updateQuantity(item.id, clampedVal);
                              }}
                              className="w-10 text-center outline-none [-moz-appearance:textfield] 
                                     [&::-webkit-inner-spin-button]:appearance-none 
                                     [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="cursor-pointer px-2.5 py-1.5 hover:bg-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-2.5 fill-current"
                                viewBox="0 0 42 42"
                              >
                                <path
                                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-300 my-4 block lg:hidden" />

              {/* Order Summary */}
              <div className="bg-gray-100 p-6 rounded-md h-max">
                <ul className="text-slate-500 font-medium space-y-4">
                  <li className="flex flex-wrap gap-4 text-sm">
                    Subtotal{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Shipping{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${shipping.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Discount{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${discount.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm">
                    Tax{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ${tax.toFixed(2)}
                    </span>
                  </li>
                  <hr className="border-slate-300" />
                  <li className="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">
                    Total <span className="ml-auto">${total.toFixed(2)}</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <button className="mt-4 mb-3 text-slate-200 text-center p-2 w-full bg-orange-500 hover:bg-orange-600 cursor-pointer rounded-md">
                    Purchase Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
