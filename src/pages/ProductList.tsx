import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/features/addtocart/cartSlice";
import { useNavigate, useParams } from "react-router";
import { RootState } from "../redux/store";
import { FaPlus, FaMinus } from "react-icons/fa";
import { noDataFound } from "../assets/images";
import { AiFillHeart } from "react-icons/ai";
import { addToWishList } from "../redux/features/wishlist/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Product {
  id: number | null;
  title: string;
  price: number;
  description: string;
  category: string;
  image: any;
  rating?: {
    rate: number;
    count: number;
  };
  isWishlist: string;
}

const ProductList: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cartData);
  const { productCategory } = useParams<{ productCategory: any }>();
  const { search } = useSelector((state: RootState) => state.searchProduct);
  const { wishlist } = useSelector((state: RootState) => state.wishListProduct);
  const ITEMS_PER_PAGE = 8;

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<Number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    let apiUrl = "https://fakestoreapi.com/products";
    if (productCategory !== "all") {
      apiUrl += `?category=${productCategory}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [productCategory]);

  useEffect(() => {
    if (productCategory === "all") {
      setSelectedCategories([
        "all",
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
      ]);
    } else {
      setSelectedCategories([productCategory]);
    }
  }, [productCategory]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (value === "all") {
      if (checked) {
        setSelectedCategories([
          "all",
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]);
      } else {
        setSelectedCategories([]);
      }
    } else {
      if (checked) {
        setSelectedCategories((prevCategories) => [
          ...prevCategories.filter((category) => category !== "all"),
          value,
        ]);
      } else {
        setSelectedCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category !== "all" && category !== value
          )
        );
      }
    }
  };

  const filteredProductsByCategory = (item: Product) => {
    if (selectedCategories.includes("all")) {
      return true;
    }
    return selectedCategories.includes(item.category);
  };

  const filteredProducts = product.filter(
    (item: Product) =>
      filteredProductsByCategory(item) &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const toggleWishlist = (item: any) => {
    dispatch(addToWishList(item));
  };

  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    if (sortBy === "lowToHigh") {
      return a.price - b.price;
    } else if (sortBy === "highToLow") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const addProductToCart = (item: Product) => {
    dispatch(addToCart(item));
    toast.success(`Added ${item.title} to the cart`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productsToDisplay = sortedProducts.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <div>
            <div className="flex justify-between py-5">
              <div className="flex items-center text-black">
                
                <div
                 className="flex gap-5 flex-col md:flex-row"
                >
                  {[
                    "all",
                    "electronics",
                    "jewelery",
                    "men's clothing",
                    "women's clothing",
                  ].map((category) => (
                    <label key={category} className="flex items-center text-lg">
                      <input
                        type="checkbox"
                        name={category}
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      <span className="ml-2 capitalize">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-black">
                <label htmlFor="sortBy" className="text-lg mr-2 ">
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={sortBy || ""}
                  onChange={handleSortByChange}
                  className="px-4 py-1 border border-gray-300 rounded-md"
                >
                  <option value="">Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
            {productsToDisplay.length === 0 ? (
              <div className="flex justify-center items-center gap-2">
                {" "}
                <img src={noDataFound} alt="" className="w-40 h-40" />
                <p className="fond-bold text-3xl">Opps... Product Not Found!</p>
              </div>
            ) : (
              <div className="max-w-screen-2xl bg-neutral-100 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-10 px-4 py-6">
                {productsToDisplay.map((item: Product) => (
                  <div
                    key={item.id}
                    className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-textShadow drop-shadow-md hover:drop-shadow-xl duration-200 flex flex-col gap-4 relative"
                  >
                    <span className="text-xs capitalize italic absolute top-0 right-0 p-1 bg-yellow-500">
                      {item.category}
                    </span>
                    <div className="w-full h-auto flex items-center justify-center relative group">
                      <img
                        className="w-52 h-64 object-contain"
                        src={item.image}
                        alt="ProductImg"
                        onClick={() => navigate(`/productsdetails/${item?.id}`)}
                      />
                    </div>

                    <div className="px-4 z-10 ">
                      <div className="flex items-center justify-between">
                        <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                          {item.title.substring(0, 20)}
                        </h2>
                        <p className="text-sm text-gray-600 font-semibold">
                          ${item.price}
                        </p>
                      </div>
                      <div className="mt-1">
                        <div className="text-yellow-500 flex items-center justify-between gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <IoMdStar
                                key={index}
                                size={30}
                                color={
                                  item.rating &&
                                  index < Math.floor(item.rating.rate)
                                    ? "yellow-900"
                                    : "gray"
                                }
                              />
                            ))}
                          </div>

                          <div>
                            <span onClick={() => toggleWishlist(item)}>
                              <AiFillHeart
                                size={24}
                                className={
                                  wishlist.find((data) => data.id === item.id)
                                    ? "text-red-500"
                                    : "text-white bg-yellow-400"
                                }
                              />
                            </span>
                          </div>
                        </div>
                      </div>

                      {cart.find((data) => data.id === item.id) ? (
                        <div className="flex items-center justify-center space-x-4 mt-4">
                          <button
                            className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                            onClick={() => {
                              dispatch(decreaseQuantity(item));
                            }}
                          >
                            <FaMinus />
                          </button>
                          <span className="bg-black text-white px-2">
                            {cart.find((data) => data.id === item.id)?.quantity}
                          </span>
                          <button
                            className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                            onClick={() => {
                              dispatch(increaseQuantity(item));
                            }}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addProductToCart(item)}
                          className="w-full font-titleFont font-medium bg-black text-white border  hover:text-yellow-500 duration-200 py-1.5 rounded-md mt-3 flex items-center justify-center gap-2"
                        >
                          <FaShoppingCart size={18} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center my-4">
              <ul className="flex gap-2">
                {Array.from({
                  length: Math.ceil(sortedProducts.length / ITEMS_PER_PAGE),
                }).map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === index + 1
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
       <ToastContainer />
    </div>
  );
};

export default ProductList;
