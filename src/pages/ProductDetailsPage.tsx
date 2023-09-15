import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/features/addtocart/cartSlice";
import { RootState } from "../redux/store";
import { FaPlus, FaMinus } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToWishList } from "../redux/features/wishlist/wishListSlice";
import { AiFillHeart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const { "*": productId } = useParams();
  const [data, setData] = useState("") as any;
  const [productData, setProductData] = useState([]);
  const { cart } = useSelector((state: RootState) => state.cartData);
  const { wishlist } = useSelector((state: RootState) => state.wishListProduct);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [productId]);

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

      });
  }, [productId]);

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const getRandomReviewText = () => {
    const reviewTexts = [
      "Not bad, but could be better.",
      "Great product, highly recommended!",
      "Amazing quality for the price!",
      "I'm satisfied with my purchase.",
      "Disappointed with the product.",
    ];
    return reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
  };

  const generateRandomReview = () => {
    return {
      name: "John Doe",
      rating: getRandomRating(),
      reviewText: getRandomReviewText(),
      helpfulCount: Math.floor(Math.random() * 50),
      unhelpfulCount: Math.floor(Math.random() * 10),
      date: getRandomDate(),
    };
  };

  const getRandomDate = () => {
    const currentDate = new Date();
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate.toDateString();
  };

  const [randomReviews, setRandomReviews] = useState<any[]>([]);

  const similarProduct = productData.filter(
    (product: any) => product.category === data.category
  );

  const toggleWishlist = (item: any) => {
    dispatch(addToWishList(item));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const reviews = Array.from({ length: 3 }).map(() => generateRandomReview());
    setRandomReviews(reviews);
  }, [productId]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex w-30 md:w-auto flex-col-reverse sm:flex-row gap-3 overflow-y-scroll md:overflow-visible ">
              <div className="flex flex-row sm:flex-col justify-center gap-3">
                <img
                  src={data?.image}
                  alt=""
                  className="w-24 h-[120px] opacity-50 hover:opacity-100 "
                />
                <img
                  src={data?.image}
                  alt=""
                  className="w-24 h-[120px] opacity-50 hover:opacity-100  "
                />
                <img
                  src={data?.image}
                  alt=""
                  className="w-24 h-[120px] opacity-50 hover:opacity-100  "
                />
                <img
                  src={data?.image}
                  alt=""
                  className="w-24 h-[120px] opacity-50 hover:opacity-100  "
                />
              </div>
              <div className="flex justify-center">
                <img src={data?.image} alt="" className="w-[400px] h-[500px]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-400">{data?.title}</p>
              <div className="flex gap-2">
                <p className="text-xl text-gray-600">Category :</p>
                <p className="text-xl capitalize italic text-gray-500">
                  {data?.category}
                </p>
              </div>
              <div className="text-yellow-500 flex items-center gap-1">
                <span className="text-ml text-gray-600">Rating :</span>
                {[...Array(5)].map((_, index) => (
                  <IoMdStar
                    key={index}
                    size={20}
                    color={
                      data?.rating && index < Math.floor(data.rating.rate)
                        ? "#FFD700"
                        : "gray"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                Count : ({data?.rating?.count})
              </span>
              <p className="text-2xl text-gray-600 font-semibold">
                ${data?.price}
              </p>

              {cart.find((item) => item.id === data.id) ? (
                <div className="flex  space-x-4 mt-4">
                  <button
                    className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                    onClick={() => {
                      dispatch(decreaseQuantity(data));
                    }}
                  >
                    <FaMinus />
                  </button>
                  <span className="bg-black text-white px-2">
                    {cart.find((item:any) => item.id === data.id)?.quantity}
                  </span>
                  <button
                    className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                    onClick={() => {
                      dispatch(increaseQuantity(data));
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button
                  className="w-[200px] font-titleFont font-medium bg-black text-white border hover:bg-gray-900 hover:border-gray-900 active:bg-gray-700 duration-200 py-1.5 rounded-md mt-3 flex items-center justify-center gap-2"
                  onClick={() => {
                    dispatch(addToCart(data));
                    toast.success(`Added ${data.title} to the cart`, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                    });
                  }}
                >
                  <FaShoppingCart size={18} />
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex justify-center gap-5">
              <button
                className={`${
                  activeTab === "description"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`${
                  activeTab === "shipping"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping & Return
              </button>
              <button
                className={`${
                  activeTab === "reviews"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-700"
                } py-2 px-4 rounded-md`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>
            <div className="mt-5 border border-gray-300 p-5">
              {activeTab === "description" && (
                <div className="p-5">
                  <div className="">
                    <p className="text-2xl text-gray-700 font-serif font-bold">
                      Product Description :
                    </p>
                    <ul className="list-disc">
                      <li className="text-gray-600 font-serif mt-3">
                        {data?.description}
                      </li>
                    </ul>
                    <ul className="list-disc ">
                      <li className="text-gray-600">
                        Nunc nec porttitor turpis. In eu risus enim. In vitae
                        mollis elit. Vivamus finibus vel mauris ut vehicula.
                        Nullam a magna porttitor, dictum risus nec, faucibus
                        sapien.
                      </li>
                      <li className="text-gray-600">
                        Vivamus finibus vel mauris ut vehicula.
                      </li>
                      <li className="text-gray-600">
                        Nullam a magna porttitor, dictum risus nec, faucibus
                        sapien.
                      </li>
                    </ul>
                    <p className="text-gray-600">{data?.description}</p>
                  </div>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="p-5 text-gray-600 font-serif">
                  <ul className="list-disc  ">
                    <li className="text-gray-600">
                      We deliver to over 100 countries around the world. For
                      full details of the delivery options we offer, please view
                      our Delivery information.
                    </li>
                    <li className="text-gray-600">
                      We hope you’ll love every purchase, but if you ever need
                      to return an item you can do so within a month of receipt.
                      For full details of how to make a return, please view our
                      Returns information.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="reviews flex flex-nowrap justify-center overflow-auto">
                  {randomReviews.map((review, index) => (
                    <div
                      className="p-4 rounded-lg shadow-md bg-white w-[300px] mx-2"
                      key={index}
                    >
                      <div className="header flex items-center gap-2">
                        <h4 className="author font-bold">
                          <p className="text-gray-800">
                            {review.name}
                          </p>
                        </h4>
                        <span className="text-gray-500 text-sm">
                          {review.date}
                        </span>
                      </div>
                      <div className="content mt-2">
                        <h4
                          className={`rating ${
                            review.rating === 5
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {review.rating === 5 ? "Excellent" : "Good"}
                        </h4>
                        <p className="text-gray-700 mt-2">
                          {review.reviewText}
                        </p>
                        <div className="action mt-3">
                          <p
                            className="link text-gray-600 flex items-center gap-1 text-sm"
                          >
                            Helpful ({review.helpfulCount})
                          </p>
                          <p
                            className="link text-gray-600 flex items-center gap-1 text-sm"
                          >
                            Unhelpful ({review.unhelpfulCount})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-3xl text-gray-700 font-serif text-center my-5 font-600">
              You May Also Like
            </p>
            <div>
              <Slider {...sliderSettings}>
                {similarProduct.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-textShadow duration-200 flex flex-col gap-4 relative"
                  >
                    <span className="text-xs capitalize italic absolute top-0 right-0 p-1 bg-yellow-500">
                      {item.category}
                    </span>
                    <div className="w-full h-auto flex items-center justify-center relative group">
                      <img
                        onClick={() => navigate(`${item?.id}`)}
                        className="w-52 h-64 object-contain"
                        src={item.image}
                        alt="ProductImg"
                      />
                    </div>

                    <div className="px-4 z-10 bg-white">
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
                    </div>

                    <div>
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
                          className="w-full font-titleFont font-medium bg-black text-white border hover:bg-gray-900 hover:border-gray-900 active:bg-gray-700 duration-200 py-1.5 rounded-md mt-3 flex items-center justify-center gap-2"
                          onClick={() => {
                            dispatch(addToCart(item));
                            toast.success(`Added ${item.title} to the cart`, {
                              position: toast.POSITION.BOTTOM_RIGHT,
                            });
                          }}
                        >
                          <FaShoppingCart size={18} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductDetailsPage;
