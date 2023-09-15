import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidShoppingBags } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsBox } from "react-icons/bs";
import { FaHandsHelping } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { searchInfo } from "../../redux/features/searchProduct/searchProductSlice";
import { RootState } from "../../redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/features/userAuth/authSlice";
import { dropdownInfo } from "../../redux/features/dropdown/dropDownSlice";

const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { cart } = useSelector((state: RootState) => state.cartData);
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector((state: RootState) => state.searchProduct);
  const { isDropdownOpen } = useSelector((state: RootState) => state.dropdDown);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { login } = useSelector((state: RootState) => state.auth);
  const handleLoginButtonClick = () => {
    setShowSignIn(!showSignIn);
    navigate("/signin");
  };

  useEffect(() => {
    if (currentPath === "/product/all") {
      setIsFormSubmitted(false);
    } else {
      setIsFormSubmitted(true);
    }
  }, [currentPath]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const serachData = productData.filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => {
    dispatch(dropdownInfo(!isDropdownOpen));
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchQuery(e.target.value);
    dispatch(searchInfo(searchValue));
    setIsFormSubmitted(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate("/product/all");
  };
  const handleLogOutButtonClick = () => {
    dispatch(dropdownInfo(!isDropdownOpen));
    dispatch(logOut());
    navigate("/");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="bg-stone-50 items-center m-auto px-2 md:px-3 py-4">
        <div className="font-semibold flex w-full justify-between items-center px-3">
          <Link to="/">
            <div className="logo flex text-3xl text-yellow-500 gap-1">
              <span>
                <BiSolidShoppingBags />
              </span>
              <span className="hidden md:inline-block text-yellow-500">
                {" "}
                MULTIMART
              </span>
            </div>
          </Link>

          <form onSubmit={handleSubmit}>
            <>
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 flex justify-end items-center pl-3 pointer-events-none">
                  <BsSearch />
                </div>

                <input
                  type="search"
                  value={searchQuery}
                  id="default-search"
                  className="block w-full p-1 pl-10 font-sans text-sm text-black border outline-none rounded-full bg-white focus:ring-gray-500 focus:border-gray-700 h-8"
                  placeholder="Search Products"
                  required
                  onChange={searchHandler}
                />
              </div>
              {search && isFormSubmitted  && (
                <div className="absolute top-47 left-50 right-50 z-50 mt-2 p-2  bg-white shadow-md rounded-md w-auto md:w-[400px] max-h-[400px] overflow-y-auto">
                  {serachData.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex gap-2 cursor-pointer"
                      onClick={() => {
                        setSearchQuery("");
                        
                        navigate(`/productsdetails/${product.id}`);
                       setIsFormSubmitted(false)
                       dispatch(searchInfo(""))

                      }}
                    >
                      <img
                        src={product?.image}
                        alt=""
                        className=" w-20 h-20 "
                      />
                      <p className=" hover:bg-gray-100 p-2 rounded-md text-2m truncate">
                        {product.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          </form>

          <div className="text-black text-3xl md:pb-0 left-0">
            <div className="flex w-full md:w-auto gap-3">
              <div className="m-auto relative hover:text-yellow-400 ">
                <Link to="/cart">
                  <FaShoppingCart />
                </Link>
                <p className="absolute -top-3 -right-1 px-1 text-sm text-white bg-black rounded-full">
                  {cart.length}
                </p>
              </div>
              <div className="flex-col">
                {login.email ? (
                  <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="text-black focus:outline-none focus:ring-blue-300 hover:text-yellow-400 rounded-lg m-auto px-2 py-2.5 text-center inline-flex items-center"
                    type="button"
                  >
                    <span className="flex">
                      <FaUser />
                    </span>
                    <span className="text-sm">
                      <BiSolidDownArrow />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleLoginButtonClick}
                    className="py-2 px-4 border-2 border-yellow-500 bg-yellow-500 text-white rounded-md transition duration-300 hover:bg-transparent hover:text-black text-sm"
                  >
                    Login
                  </button>
                )}
                <div
                  id="dropdown"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } absolute right-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-50 `}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li onClick={toggleDropdown}>
                      <Link
                        to="/userprofile"
                        className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span>
                          <BiSolidUserDetail />
                        </span>
                        MY ACCOUNT
                      </Link>
                    </li>

                    <li onClick={toggleDropdown}>
                      <Link
                        to="/order"
                        className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span>
                          <BsBox />
                        </span>
                        ORDERS
                      </Link>
                    </li>
                    <li onClick={toggleDropdown}>
                      <Link
                        to="/wishlist"
                        className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span>
                          <BsFillSuitHeartFill />
                        </span>
                        WISHLIST
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/savedaddress"
                        className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span>
                          <FaHandsHelping />
                        </span>
                       Saved Address
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/helpcenter"
                        className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <span>
                          <FaHandsHelping />
                        </span>
                        Help Center
                      </Link>
                    </li>
                    <li onClick={handleLogOutButtonClick}>
                      <div className="flex gap-1 items-center px-4 py-2 hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <span>
                          <PiSignOutBold />
                        </span>
                        Sign out
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
