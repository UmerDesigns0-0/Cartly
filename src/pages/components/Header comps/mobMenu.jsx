import { useState } from "react";
import CateSearch from "./CateSearch";

import SearchBar from "../SearchBar";

function MobMenu({
  onMenuOpen,
  selectedCategory,
  setSelectedCategory,
  isCateOpen,
  setIsCateOpen,
}) {

  return (
    <>
      {/* Small screens Menu */}
      <div className="flex items-center justify-around lg:hidden">
        {/* Sidebar toggle */}
        <div>
          <div
            onClick={onMenuOpen}
            className="flex cursor-pointer select-none items-center gap-x-2 
                       rounded-lg border border-transparent 
                       focus:border-gray-600 bg-slate-100 py-2 px-2 text-gray-950 
                       hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </div>
        </div>

        {/* Search + Categories */}
        <div className="ml-6 flex flex-1 justify-center gap-x-2">
          <div className="relative">
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
              <span
                className={`text-sm w-max truncate ${
                  selectedCategory.length > 10
                    ? "text-[10px] md:text-sm"
                    : "text-sm"
                }`}
              >
                {selectedCategory.replace("-", " ").length > 15
                  ? `${selectedCategory.replace("-", " ").slice(0, 15)}...`
                  : selectedCategory.replace("-", " ")}
              </span>
            </div>

            {/* Category dropdown */}
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

          {/* Input field */}
          <SearchBar selectedCategory={selectedCategory} />
        </div>
      </div>
    </>
  );
}

export default MobMenu;
