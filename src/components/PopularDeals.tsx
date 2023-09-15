import React from "react";
import { NavLink } from "react-router-dom";
import { banner1, banner2, banner3 } from "../assets/images";

const PopularDeals: React.FC = () => {
  return (
    
      <div className="py-16">
          <h2 className="text-center text-2xl mb-4">New Arrivals</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div >
           
            <div className="banner banner-overlay banner-overlay-light relative">
              <img src={banner1} alt="Banner" />
              <div className="banner-content absolute left-0 bottom-0 p-4 text-black">
                <h4 className="banner-subtitle">Smart Offer</h4>
                <h3 className="banner-title">
                  Save $150
                  <strong>
                    on Samsung <br />
                    Galaxy Note9
                  </strong>
                </h3>
                <NavLink to="/product/electronics">
                  <button className="border border-gray-400 rounded-md p-1 mt-1 hover:bg-black hover:text-yellow-500">
                    Shop Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          <div >
            <div className="banner banner-overlay banner-overlay-light relative">
              <img src={banner2} alt="Banner" />

              <div className="banner-content absolute left-0 bottom-0 p-4 text-black">
                <h4 className="banner-subtitle">Time Deals</h4>
                <h3 className="banner-title">
                  <strong>Bose SoundSport</strong> <br />
                  Time Deal -30%
                </h3>
                <NavLink to="/product/electronics">
                  <button className="border border-gray-400 rounded-md p-1 mt-1 hover:bg-black hover:text-yellow-500">
                    Shop Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>

          <div >
            <div className="banner banner-overlay banner-overlay-light relative">
              <img src={banner3} alt="Banner" />

              <div className="banner-content absolute left-0 bottom-0 p-4 text-black">
                <h4 className="banner-subtitle">Clearance</h4>
                <h3 className="banner-title">
                  <strong>GoPro - Fusion 360</strong> <br />
                  Save $70
                </h3>
                <NavLink to="/product/electronics">
                  <button className="border border-gray-400 rounded-md p-1 mt-1 hover:bg-black hover:text-yellow-500">
                    Shop Now
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default PopularDeals;
