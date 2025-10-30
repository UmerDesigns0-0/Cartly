import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import MobMenu from "./components/Header comps/mobMenu";
import HeaderUpper from "./components/Header comps/HeaderUpper";
import CateTabs from "./components/Header comps/CateTabs";
import HeaderSidebar from "./components/Header comps/HeaderSidebar";

import AOS from "aos";
import "aos/dist/aos.css";

import CateCaro from "./components/Carousels/CateCaro";

function Header() {
  const [activeTab, setActiveTab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCateOpen, setIsCateOpen] = useState(false);

  const menuRef = useRef(null);
  const cateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      // if (cateRef.current && !cateRef.current.contains(e.target)) {
      //   setIsCateOpen(false);
      // }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true, // whether animation should happen only once
    });
  }, []);


  // Category Tabs
  const {
    data: allCategories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      if (!res.ok) throw new Error("Network response was not ok");
      return await res.json();
    },
  });

  // filter + shuffle only once
  const categories = useMemo(() => {
    const allowed = [
      "smartphones",
      "groceries",
      "tops",
      "womens-bags",
      "womens-jewellery",
      "sunglasses",
      "automotive",
      "motorcycle",
      "lighting",
      "fragrances",
      "home-decoration",
      "womens-dresses",
      "laptops",
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
    ];

    const filtered = allCategories.filter((cat) => allowed.includes(cat.slug));
    return filtered.sort(() => Math.random() - 0.5).slice(0, 8);
  }, [allCategories]);


  return (
    <>
      {/* <!-- component --> */}
      <div className="bg-white">
        <div className="py-3 px-6">
          <HeaderUpper
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isCateOpen={isCateOpen}
            setIsCateOpen={setIsCateOpen}
            cateRef={cateRef}
          />

          <div className="mt-6 px-4 w-full">
            <MobMenu
              onMenuOpen={() => setIsOpen(true)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isCateOpen={isCateOpen}
              setIsCateOpen={setIsCateOpen}
              cateRef={cateRef}
            />
            <CateTabs
              direction="horizontal"
              activeTab={activeTab}
              onTabChange={setActiveTab}
              categories={categories}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
            {/* sidebar (drawer) for mobile */}
            <HeaderSidebar
              ref={menuRef}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              categories={categories}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />

            {/* content always below header */}
            {activeTab && (
              <div className="mt-6">
                <div className="flex justify-between">
                  {/* <div>{tabs[activeTab]}</div> */}
                  <h5 className="font-semibold capitalize">{activeTab}</h5>
                  <button
                    onClick={() => setActiveTab(null)}
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="text-gray-600 bg-transparent hover:scale-110 hover:text-gray-500 rounded-lg text-sm p-1.5 inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>
                <div data-aos="flip-down" className="mt-4">
                  <CateCaro activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
            )}

            {/* <span className="cate cursor-pointer rounded-sm py-1 text-sm hover:text-orange-500">
              Becoma a seller
            </span> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
