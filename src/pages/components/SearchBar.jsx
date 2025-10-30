import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchBar({ selectedCategory = "All Categories" }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500)
  }, [query]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["results", selectedCategory, debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery.trim()) return [];

      let url = `https://dummyjson.com/products/search?q=${debouncedQuery}`;

      // If a specific category is selected, filter by category
      if (selectedCategory !== "All Categories") {
        url = `https://dummyjson.com/products/category/${selectedCategory}?q=${debouncedQuery}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      // If searching within a category, filter results by query
      let products = data.products || [];

      if (selectedCategory !== "All Categories" && debouncedQuery.trim()) {
        products = products.filter(
          (p) =>
            p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
      }

      return products;
    },
  });

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        placeholder={
          selectedCategory === "All Categories"
            ? "Search products..."
            : `Search ${selectedCategory.toLowerCase().replace("-", " ")}...`
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md border border-[#DDE2E4] focus:border-orange-500 focus:outline-none px-3 py-2 text-sm"
      />

      {/* Dropdown */}
      {query && (
        <div className="absolute right-0 bg-white border border-gray-200 mt-1 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto w-[80vw] md:w-full">
          {isLoading ? (
            <p className="p-3 text-sm text-gray-500">Searching...</p>
          ) : results?.length > 0 ? (
            results?.map((product) => (
              <Link
                key={product?.id}
                onClick={() => setQuery("")}
                to={`/product/${product?.id}`}
              >
                <div className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer">
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(product?.title, query),
                    }}
                  ></p>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-3 text-sm text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ✅ Highlight matching query text in bold
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong class='text-orange-600'>$1</strong>");
}

export default SearchBar;
