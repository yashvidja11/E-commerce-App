import React from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer: React.FC = () => {
  const handleCopy = (text:any) => {
    navigator.clipboard.writeText(text);
    toast.info(`${text} copied to clipboard`, {
      position: "bottom-right",
      autoClose: 1000,
      style: {
        background: "blue",
        color: "white",
      },
    });
  };

  return (
    <footer className="bg-black py-20 text-white mt-3">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="box">
            <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold italic text-yellow-500">
              MultiMart
            </h1>
            <p className="text-sm md:text-base font-light opacity-70 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </p>
            <div className="flex lg:flex-row justify-center flex-col items-center ">
              <div className="img flex bg-dark px-2 py-1 rounded">
                <Link to="/*">
                  <FaInstagram className="text-white text-lg m-1 cursor-pointer" />
                </Link>
                <span className="text-white ml-1">Instagram</span>
              </div>
              <div className="img flex bg-dark px-2 py-1 rounded ml-1">
                <Link to="/*">
                  <FaFacebook className="text-white text-lg m-1 cursor-pointer" />
                </Link>
                <span className="text-white ml-1">Facebook</span>
              </div>
              <div className="img flex bg-dark px-2 py-1 rounded ml-1">
                <Link to="/*">
                  {" "}
                  <FaYoutube className="text-white text-lg m-1 cursor-pointer" />
                </Link>
                <span className="text-white ml-1">YouTube</span>
              </div>
            </div>
          </div>

          <div className="box">
            <h2 className="mb-4 text-xl font-bold text-yellow-500">About Us</h2>
            <ul>
              <Link to="/*">
                <li className="mb-2 opacity-70">Careers</li>
                <li className="mb-2 opacity-70">Our Stores</li>
                <li className="mb-2 opacity-70">Our Cares</li>
                <li className="mb-2 opacity-70">Terms & Conditions</li>
                <li className="mb-2 opacity-70">Privacy Policy</li>
              </Link>
            </ul>
          </div>

          <div className="box">
            <h2 className="mb-4 text-xl font-bold text-yellow-500">
              Customer Care
            </h2>
            <ul>
              <Link to="/helpcenter">
                <li className="mb-2 opacity-70">Help Center</li>
              </Link>
              <Link to="/helpcenter">
                <li className="mb-2 opacity-70">How to Buy</li>
              </Link>
              <Link to="/helpcenter">
                <li className="mb-2 opacity-70">Track Your Order</li>
              </Link>
              <Link to="/helpcenter">
                {" "}
                <li className="mb-2 opacity-70">Corporate & Bulk Purchasing</li>
              </Link>
              <Link to="/helpcenter">
                <li className="mb-2 opacity-70">Returns & Refunds</li>
              </Link>
            </ul>
          </div>

          <div className="box">
            <h2 className="mb-4 text-xl font-bold text-yellow-500">
              Contact Us
            </h2>
            <ul>
              <li className="mb-2 opacity-70">
                A-201-207, Sankalp Iconic Tower, Near Iscon Cross Road, Ambli -
                Bopal Rd, Ahmedabad, Gujarat 380058
              </li>
              <li className="mb-2 opacity-70">
              Email:{" "}
              <span
                onClick={() => handleCopy("multimart@gmail.com")}
              >
                multimart@gmail.com
              </span>
              </li>
              <li className="mb-2 opacity-70">
              Phone:{" "}
              <span
                onClick={() => handleCopy("063536 97824")}
              >
                063536 97824
              </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-500"> MultiMart </span>. All rights
          reserved.
        </p>
      </div>
      <ToastContainer/>
    </footer>
  );
};

export default Footer;
