import React from "react";
import { NavLink } from "react-router-dom";
import { all, mens, womens, jewelery, electronics } from "../assets/images/index";


const CategoryList: React.FC = () => {
  return (
    <div>
      <div className="container py-8">
        <h2 className="text-center text-2xl mb-4">Explore Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="mx-auto">
            <NavLink
              to="/product/all"
              className="block hover:-translate-y-1 transform transition-transform"
            >
              <figure className="relative">
                <img
                  src={all}
                  alt="Category All"
                  className="w-full lg:h-52 h-40 object-cover"
                />
              </figure>
              <h3 className="text-center mt-2 text-lg font-semibold">
                All
              </h3>
            </NavLink>
          </div>
          <div className="mx-auto">
            <NavLink
              to="/product/men's clothing"
              className="block hover:-translate-y-1 transform transition-transform"
            >
              <figure className="relative">
                <img
                  src={mens}
                  alt="Category Men"
                  className="w-full lg:h-52 h-40 object-cover"
                />
              </figure>
              <h3 className="text-center mt-2 text-lg font-semibold">
                Men
              </h3>
            </NavLink>
          </div>
          <div className="mx-auto">
            <NavLink
              to="/product/women's clothing"
              className="block hover:-translate-y-1 transform transition-transform"
            >
              <figure className="relative">
                <img
                  src={womens}
                  alt="Category Women"
                  className="w-full lg:h-52 h-40 object-cover"
                />
              </figure>
              <h3 className="text-center mt-2 text-lg font-semibold">
                Women
              </h3>
            </NavLink>
          </div>
          <div className="mx-auto">
            <NavLink
              to="/product/jewelery"
              className="block hover:-translate-y-1 transform transition-transform"
            >
              <figure className="relative">
                <img
                  src={jewelery}
                  alt="Category Jewellery"
                  className="w-full lg:h-52 h-40 object-cover"
                />
              </figure>
              <h3 className="text-center mt-2 text-lg font-semibold">
                Jewellery
              </h3>
            </NavLink>
          </div>
          <div className="mx-auto">
            <NavLink
              to="/product/electronics"
              className="block hover:-translate-y-1 transform transition-transform"
            >
              <figure className="relative">
                <img
                  src={electronics}
                  alt="Category Electronics"
                  className="w-full h-52 object-cover"
                />
              </figure>
              <h3 className="text-center mt-2 text-lg font-semibold">
                Electronics
              </h3>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
