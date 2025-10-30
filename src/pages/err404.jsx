import img404 from "../assets/404.png";
import { Link } from "react-router-dom";

function Err404() {
  return (
    <>
        <div className="px-4 text-center mt-8">
          <img
            src={img404}
            alt="404 Illustration"
            className="mx-auto w-80 select-none [animation:bounce_2s_infinite] rounded-lg"
            draggable="false"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold opacity-80 text-orange-500 mt-6">
            Looks Like You're Lost!
          </h1>
          <p className="text-xl text-gray-500 mt-2">
            We can't seem to find the page you're looking for.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-orange-500 text-white px-8 py-2 rounded-lg text-lg font-semibold shadow-lg hover:bg-orange-600"
          >
            Return Home
          </Link>
        </div>
    </>
  );
}

export default Err404;
