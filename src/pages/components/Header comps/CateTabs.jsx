import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

function CateTabs({
  direction = "horizontal",
  activeTab,
  onTabChange,
  categories,
  isLoading,
  isError,
  error,
}) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true, // whether animation should happen only once
    });
  }, []);

  if (isLoading) return <div className="hidden lg:block text-sm text-gray-500">Loading...</div>;
  if (isError)
    return <div className="hidden lg:block text-sm text-red-500">Error: {error.message}</div>;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div
        className={`flex ${
          direction === "horizontal"
            ? "flex-row hidden lg:flex gap-x-8"
            : "flex-col gap-y-4"
        }`}
      >
        {categories.map((cat) => (
          <span
            key={cat.slug}
            onClick={() =>
              onTabChange(cat.slug === activeTab ? null : cat.slug)
            } // toggle if same tab clicked
            // combine cate + active classes dynamically
            className={`cate cursor-pointer pl-2 lg:pl-0 py-1 text-sm ${
              activeTab === cat.slug ? "active" : ""
            }`}
          >
            {cat.name}
            {/* underline */}
            <span
              className={direction === "horizontal" ? `undl2` : `undl-left`}
            ></span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default CateTabs;
