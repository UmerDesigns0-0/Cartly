import Cartly from "../Header comps/Cartly.png";
import { useState, useEffect, useRef } from "react";
import CateSearch from "./CateSearch";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

import SearchBar from "../SearchBar";

import Cart from "../Cart";
import Account from "../Account";

function HeaderUpper({
  selectedCategory,
  setSelectedCategory,
  isCateOpen,
  setIsCateOpen,
}) {
  const { cart } = useContext(CartContext);

  // Close cart on click outside
  const cartRef = useRef(null);
  const accountRef = useRef(null);
  // const cateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const [input, setInput] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between max-h-10 items-center gap-x-6 md:gap-x-12">
        <div className="px-2 flex items-center">
          <Link to="/">
            <img
              src={Cartly}
              draggable="false"
              className="h-16 w-16 md:h-20 md:w-20 cursor-pointer select-auto"
              alt="Cartly"
            />
          </Link>
          {/* <span className="ml-2 font-semibold text-[#252C32]">What a Market</span> */}
        </div>

        <div className="ml-6 flex-1 gap-x-2 hidden justify-center lg:flex">
          <div
            onClick={() => setIsCateOpen((prev) => !prev)}
            tabIndex="0"
            className="flex cursor-pointer select-none items-center gap-x-2
                        rounded-lg border border-transparent
                        focus:border-gray-600 bg-slate-100 py-2 px-4
                        text-gray-950 hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="relative text-sm w-max capitalize">
              <span>{selectedCategory.replace("-", " ")}</span>
              <CateSearch
                isOpen={isCateOpen}
                onClosing={() => setIsCateOpen(false)}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  setIsCateOpen(false);
                }}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>

          <SearchBar selectedCategory={selectedCategory} />
        </div>

        <div className="ml-2 flex gap-x-1.5 px-2">
          <div className="flex cursor-pointer items-center gap-x-1">
            <Link to="/Help">
              <button className="cursor-pointer text-sm rounded-2xl bg-orange-400 py-2 px-5 text-amber-50 hover:bg-orange-500">
                Help
              </button>
            </Link>
          </div>
          <div
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className="group relative flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-orange-500"
          >
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <span className="txt text-sm hidden sm:block">
              Account
              <span className="undl"></span>
            </span>
            {/* Account dropdown */}
            {isAccountOpen && (
              <div className="absolute top-full right-0 z-50 mt-2">
                <Account
                  ref={accountRef}
                  onClose={() => setIsAccountOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Cart button + modal wrapper */}
          <div className="relative">
            <div
              onClick={() => setIsCartOpen((p) => !p)}
              className={
                isCartOpen
                  ? "group flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 text-orange-400"
                  : "group flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:text-orange-500"
              }
            >
              <div className="relative">
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                        1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 
                        0 0 1-1.12-1.243l1.264-12A1.125 1.125 
                        0 0 1 5.513 7.5h12.974c.576 0 
                        1.059.435 1.119 1.007ZM8.625 
                        10.5a.375.375 0 1 1-.75 
                        0 .375.375 0 0 1 .75 0Zm7.5 
                        0a.375.375 0 1 1-.75 0 
                        .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 hover:bg-orange-500 p-2 text-xs text-white">
                  {cart.length}
                </span>
              </div>
              <span className="txt text-sm hidden md:block">
                Cart
                <span className="undl"></span>
              </span>
            </div>

            {/* BASIC/RECOMMENDED METHOD */}
            {isCartOpen && (
              <div className="absolute top-full right-0 z-50 mt-2">
                <Cart ref={cartRef} onClose={() => setIsCartOpen(false)} />
              </div>
            )}

            {/* PROP METHOD
            {isOpen && (
              <Cart
                onClose={() => setIsOpen(false)}
                className="absolute top-full right-0 z-50 mt-2"
              />
            )} */}
          </div>
          <div className="w-max hidden ml-2 cursor-pointer items-center gap-x-1 rounded-md border hover:border-gray-500 py-2 px-4 hover:text-gray-800">
            <span className="text-sm">Sign in</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderUpper;
