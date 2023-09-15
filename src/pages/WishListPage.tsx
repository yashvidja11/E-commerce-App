import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { noDataFound } from "../assets/images";
import { addToWishList } from "../redux/features/wishlist/wishListSlice";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/features/addtocart/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RootState } from "../redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistPage: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.cartData);
  const { wishlist } = useSelector((state: RootState) => state.wishListProduct);
  const dispatch = useDispatch();

  const toggleWishlist = (item: any) => {
    dispatch(addToWishList(item));
  };

  const addProductToCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success(`Added ${item.title} to the cart`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-4">
        <AiFillHeart className="text-red-500 text-4xl mb-2" />
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <img src={noDataFound} alt="" className="w-40 h-40" />
          <p className="font-bold text-3xl">Oops... Your wishlist is empty!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-3 sm:py-4 sm:px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Product Name
                </th>
                <th className="py-2 px-3 sm:py-4 sm:px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Unit Price
                </th>
                <th className="py-2 px-3 sm:py-4 sm:px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item: any) => (
                <tr key={item.id} className="hover:bg-grey-lighter">
                  <td className="py-2 px-3 sm:py-4 sm:px-6 border-b border-grey-light">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <span className="text-sm sm:text-base">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-6 border-b border-grey-light">
                    ${item.price}
                  </td>
                  <td className="py-2 px-3 sm:py-4 sm:px-6 border-b border-grey-light flex flex-col sm:flex-row justify-between items-center">
                    {cart.find((data) => data.id === item.id) ? (
                      <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-4">
                        <button
                          className="hover:bg-yellow-500 hover:text-white px-1 sm:px-2 py-1 rounded-full border border-gray-300"
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >
                          <FaMinus />
                        </button>
                        <span className="bg-black text-white px-2 py-1">
                          {cart.find((data) => data.id === item.id)?.quantity}
                        </span>
                        <button
                          className="hover:bg-yellow-500 hover:text-white px-1 sm:px-2 py-1 rounded-full border border-gray-300"
                          onClick={() => dispatch(increaseQuantity(item))}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addProductToCart(item)}
                        className="w-full sm:w-auto font-titleFont font-medium bg-black text-white border hover:bg-gray-900 hover:text-yellow-500 hover:border-gray-900 active:bg-gray-700 duration-200 py-1.5 sm:py-2 rounded-md mt-2 sm:mt-3 flex items-center justify-center space-x-1 sm:space-x-2"
                      >
                        <FaShoppingCart size={18} />
                        <span className="hidden sm:inline-block">
                          Add to Cart
                        </span>
                      </button>
                    )}
                    <div className="mt-2 sm:mt-0">
                      <span onClick={() => toggleWishlist(item)}>
                        <AiFillHeart
                          size={24}
                          className={
                            wishlist.find((data: any) => data.id === item.id)
                              ? "text-red-500"
                              : "text-white bg-yellow-400"
                          }
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;
