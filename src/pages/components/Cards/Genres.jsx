import { Link } from "react-router-dom";

function Genres() {
  const info = [
    {
      url: "https://images.unsplash.com/photo-1729525589491-7142aa9419d8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Art & Collectibles",
      name: "Discover stunning arts and collectibles",
      categories: ["home-decoration", "furniture", "womens-jewellery", "fragrances"],
    },
    {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Clothing & Shoes",
      name: "Find the latest clothing and shoes",
      categories: [
        "tops",
        "womens-dresses",
        "mens-shoes",
        "womens-shoes",
        "womens-bags",
      ],
    },
    {
      url: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Tech & Gadgets",
      name: "Discover the latest tech gadgets",
      categories: ["smartphones", "laptops", "motorcycle"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-2 py-4">
      {info.map((inf, index) => (
        <Link
          to={`/genre/${inf.title.toLowerCase().replace(/\s+/g, "-")}`}
          state={{
            categories: inf.categories,
            title: inf.title,
            description: inf.name,
          }}
          key={index}
          title={inf.name}
          className="relative rounded-sm bg-gray-500 bg-cover bg-center h-52 2xl:h-64 w-full flex items-end p-4"
        >
          <img
            src={inf.url}
            alt={inf.title}
            className="absolute inset-0 w-full h-full object-cover rounded-sm opacity-90 hover:opacity-75 cursor-pointer"
          />
          <p className="relative text-md text-white font-medium">{inf.title}</p>
        </Link>
      ))}
    </div>
  );
}

export default Genres;
