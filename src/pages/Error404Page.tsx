import React from "react";
import { Link } from "react-router-dom";

const Error404Page: React.FC = () => {
  return (
    <div className="bg-gray-700">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-gray-200 shadow overflow-hidden sm:rounded-lg pb-8 ">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-#1e293b animate-bounce">
              404
            </h1>
            <h1 className="text-6xl font-medium py-8 animate-pulse	">
              Oops! Page not found
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium ">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <Link to="/">
            <button className="bg-black text-white hover:text-yellow-500 font-semibold px-6 py-3 rounded-md mr-6">
              HOME
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
