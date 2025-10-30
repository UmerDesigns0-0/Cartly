import CateTabs from "./CateTabs";
import { forwardRef } from "react";

const HeaderSidebar = forwardRef(
  (
    {
      isOpen,
      onClose,
      activeTab,
      onTabChange,
      categories,
      isLoading,
      isError,
      error,
    },
    ref
  ) => {
    return (
      <>
        <div
          ref={ref}
          id="drawer-navigation"
          className={`fixed z-50 shadow-slate-400 shadow-md p-6 top-0 left-0 h-full w-56 md:w-68 lg:hidden bg-white transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`} // 👈 slides in/out
          tabIndex="-1"
          aria-labelledby="drawer-navigation-label"
        >
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-700"
          >
            Choose Category
          </h5>
          <button
            onClick={onClose}
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-600 bg-transparent hover:scale-110 hover:text-gray-500 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
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
          <div className="py-4 overflow-y-auto">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading categories...</p>
            ) : isError ? (
              <p className="text-sm text-red-500">Error: {error.message}</p>
            ) : (
              <CateTabs
                activeTab={activeTab}
                direction="vertical"
                onTabChange={(tab) => {
                  onTabChange((prev) => (prev === tab ? null : tab));
                  onClose();
                }}
                categories={categories}
                isLoading={isLoading}
                isError={isError}
                error={error}
              />
            )}
          </div>
        </div>
      </>
    );
  }
);

export default HeaderSidebar;
