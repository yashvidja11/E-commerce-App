import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import Header from "../components/common/Header";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Footer from "../components/common/Footer";
import { useDispatch } from "react-redux";
import { dropdownInfo } from "../redux/features/dropdown/dropDownSlice";

const MasterLayout: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]); 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`z-50 ${isSticky ? "sticky top-0 bg-white transition-all duration-1000" : ""}`}>
        <Header />
      </div>
      <div className="px-0 md:px-20 bg-gray-100 pt-10" onClick={() => dispatch(dropdownInfo(false))}>
        <Outlet />
      </div>
      <Footer />
    
      <div
        className={`fixed bottom-10 right-4 text-yellow-500 cursor-pointer transition-opacity duration-200 ${window.scrollY > 100 ? "opacity-100" : "opacity-0"
          }`}
        onClick={scrollToTop}
      >
        <AiOutlineArrowUp size={42} />
      </div>
    </div>
  );
};

export default MasterLayout;
