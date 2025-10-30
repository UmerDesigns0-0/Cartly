import { forwardRef } from "react";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const CateSearch = forwardRef(
  ({ isOpen, onClosing, onSelectCategory, selectedCategory }, ref) => {
    if (!isOpen) return null; // Do not render if not open

    const cates = [
      "All Categories",
      "smartphones",
      "groceries",
      "tops",
      "womens-bags",
      "womens-jewellery",
      "sunglasses",
      "automotive",
      "motorcycle",
    ];

    useEffect(() => {
      Aos.init({ duration: 300, once: true });
    }, []);

    return (
      <div
        data-aos="fade-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        ref={ref}
        className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-md border border-gray-200 mt-3 py-4 px-6 z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Categories</h3>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClosing();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {cates.map((category) => (
            <li
              key={category}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory(category);
              }}
              className={`cursor-pointer transition-colors capitalize ${
                selectedCategory === category
                  ? "text-orange-500 font-medium"
                  : "hover:text-orange-500"
              }`}
            >
              {category.replace("-", " ")}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

CateSearch.displayName = "CateSearch"; // Set display name for better debugging

export default CateSearch;
