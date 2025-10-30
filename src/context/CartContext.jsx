import { createContext, useState, useEffect, useMemo } from "react";

import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const success = (productName) =>
    toast.success(`${productName} added to cart!`);
  const removed = (productName, source = "cart") =>
    toast(`${productName} removed from ${source}.`, {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      ),
    });
  const updated = (productName) =>
    toast(`${productName} quantity updated.`, {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ),
    });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return [];
    try {
      const parsed = JSON.parse(savedCart);
      // Filter out invalid items
      return parsed.filter((item) => item && item?.id);
    } catch (e) {
      console.error("Corrupted cart data:", e);
      return [];
    }
  });

  const [checkoutItems, setCheckoutItems] = useState(() => {
    const saved = localStorage.getItem("checkoutItems");
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    return localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    return localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
  }, [checkoutItems]);



  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.warn("Invalid product passed to addToCart:", product);
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        updated("Item's");
        return prev.map((item) =>
          item?.id === product?.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        if (quantity > 0) {
          const addedAt = new Date().toISOString();
          success("Item");
          const updatedCart = [...prev, { ...product, quantity, addedAt }];

          // ✅ sort newest first
          return updatedCart.sort(
            (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
          );
        } else {
          return prev; // don't add anything
        }
      }
    });
  };

  // Calculations
  const subtotal = useMemo(
    () =>
      cart.reduce((acc, item) => acc + item?.price * item?.quantity || 1, 0),
    [cart]
  );

  // 🧾 Tax: 8%
  const taxRate = 0.08;
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);

  // 💰 Pre-total (subtotal + tax) — used to decide shipping
  const preTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  // 🚚 Shipping: free if preTotal > 5000
  const shipping = useMemo(() => (preTotal > 5000 ? 0 : 5), [preTotal]);

  // 🧮 Final total
  const total = useMemo(() => preTotal + shipping, [preTotal, shipping]);

  const removeItem = (id) => {
    if (!id) return;
    setCart((prev) => {
      // Find the item to remove
      const item = prev.find((i) => i.id === id);
      removed("Item", "cart");
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const goToCheckout = (items) => {
    setCheckoutItems(Array.isArray(items) ? items : [items]);
  };


  const removeCheckoutItem = (id) => {
    if (!id) return;
    removed("Item", "checkout");
    setCheckoutItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCheckout = () => {
    setCheckoutItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        updateQuantity,
        subtotal,
        shipping,
        tax,
        total,
        checkoutItems,
        goToCheckout,
        removeCheckoutItem,
        clearCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
