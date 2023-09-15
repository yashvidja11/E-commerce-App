import React, { useState } from "react";
import { emptyCart } from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { RootState } from "../redux/store";
import { RiArrowRightLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import {
  decreaseQuantity,
  increaseQuantity,
  moveToCart,
  removeFromCart,
  resetCart,
  saveForLater,
} from "../redux/features/addtocart/cartSlice";


const AddToCartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showClearCartConfirmation, setShowClearCartConfirmation] =
    useState(false);
  
  const { cart, totalPrice, savedItems } = useSelector(
    (state: RootState) => state.cartData
  );
  const {login} = useSelector((state:RootState)=>state.auth)

  const decreseHandler = (item: any) => {
    dispatch(decreaseQuantity(item));
  };

  const increaseHandler = (item: any) => {
    dispatch(increaseQuantity(item));
  };

  const removeFromCartHandler = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const clearCartHandler = () => {
    dispatch(resetCart());
  };
  const saveForLaterHandler = (itemId: string) => {
    dispatch(saveForLater(itemId));
  };
  const moveToCartHandler = (itemId: string) => {
    dispatch(moveToCart(itemId));
  };
  return (
    <div>
      <div className="flex items-center justify-center text-3xl  mb-6">
        <BiSolidShoppingBags className=" lg:text-3xl mr-2 text-yellow-500" />
        <h1 className="lg:text-3xl font-bold text-center text-gray-800">
          MY CART
        </h1>
      </div>
      <div className="container mx-auto px-4 lg:px-8 py-1 flex flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-3/4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-end justify-end lg:flex-row gap-4 py-10">
              <div>
                <img
                  className="w-64 md:w-80 rounded-lg p-4 mx-auto"
                  src={emptyCart}
                  alt="Empty Cart"
                />
              </div>
              <div className="lg:w-96 p-5 bg-white flex flex-col items-center rounded-md shadow-lg">
                <h1 className="font-bold text-xl mb-3 text-gray-800">
                  Your Cart Is Empty
                </h1>
                <p className="text-sm text-center text-gray-700">
                  Your shopping cart is ready to be filled. Add items to make it
                  happy!
                </p>
                <Link to="/">
                  <button className="mt-6 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-900 hover:text-yellow-500 px-6 py-2 font-semibold text-lg">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            cart.map((item: any) => (
              <div
                className="border border-gray-300 p-4 rounded-md flex flex-col lg:flex-row justify-between items-center mb-4"
                key={item.id}
              >
                <img
                  src={item?.image}
                  alt=""
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-4 lg:mb-0"
                />
                <div className="lg:flex-1 lg:ml-4">
                  <p className="text-lg font-medium text-gray-800 mb-2">
                    {item?.title}
                  </p>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-gray-600">Qty:</span>
                    <button
                      className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                      onClick={() => decreseHandler(item)}
                    >
                      <FaMinus />
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      className="hover:bg-yellow-500 hover:text-white px-2 py-1 rounded-full border border-gray-300"
                      onClick={() => increaseHandler(item)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    Price: ${item?.price?.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 p-2 rounded-lg border border-gray-300 flex items-center justify-center mb-2"
                    onClick={() => setShowDeleteConfirmation(true)}
                  >
                    <span className="mr-1"> Remove </span>
                    <RiDeleteBinLine />
                  </button>
                  {showDeleteConfirmation && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                        <p className="mb-4 text-center capitalize">
                          Are You Sure You Want To remove this item?
                        </p>
                        <div className="flex justify-center space-x-4">
                          <button
                            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
                            onClick={() => {
                              removeFromCartHandler(item.id);
                              setShowDeleteConfirmation(false);
                            }}
                          >
                            <span className="flex items-center gap-1">
                              Delete
                              <RiDeleteBinLine />
                            </span>
                          </button>
                          <button
                            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowDeleteConfirmation(false)}
                          >
                            <span className="flex items-center gap-1">
                              Cancel
                              <ImCancelCircle />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg border border-gray-300 flex items-center justify-center mb-2"
                    onClick={() => saveForLaterHandler(item.id)}
                  >
                    <span className="mr-2"> Save </span>
                    <FaRegBookmark />
                  </button>
                  <div className="flex justify-end">
                    <p className="font-bold mr-2">Sub Total:</p>
                    <p>${(item?.price * item?.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div>
              <button
                className="bg-red-500 text-white hover:bg-red-700  px-4 py-2 rounded-lg"
                onClick={() => setShowClearCartConfirmation(true)}
              >
                Clear Cart
              </button>
              {showClearCartConfirmation=== true && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
                  <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                    <p className="mb-4 text-center">
                      Are you sure you want to clear the cart?
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
                        onClick={() => {
                          clearCartHandler();
                          setShowClearCartConfirmation(false);
                        }}
                      >
                        <span className="flex items-center gap-1">
                              Delete
                              <RiDeleteBinLine />
                            </span>
                      </button>
                      <button
                        className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={() => setShowClearCartConfirmation(false)}
                      >
                       <span className="flex items-center gap-1">
                              Cancel
                              <ImCancelCircle />
                            </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="lg:w-2/4 border border-gray-300 p-4 h-auto mt-10 lg:mt-0">
            <p className="font-semibold bg-black text-white text-center p-3">
              Order Summary
            </p>
            <hr className="my-3" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Items ({cart.length}):</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount:</p>
                <p>$0.00</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-bold">Total Amount:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center mt-5 justify-between">
              <button
                onClick={() => {
                 navigate(login.email ? "/checkout" : "/signin")
                }}
                className="w-auto  p-2 font-medium bg-black text-white border hover:bg-gray-900 hover:text-yellow-500 hover:border-gray-900 active:bg-gray-700 duration-200 rounded-md"
              >
                Proceed to Checkout
              </button>
              <Link to="/">
                <button className="w-auto p-2 font-medium bg-black text-white border hover:bg-gray-900 hover:text-yellow-500 hover:border-gray-900 active:bg-gray-700 duration-200 rounded-md">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="w-full border border-gray-300 p-4 mt-10">
        <p className="font-semibold bg-black text-white text-center p-3">
          Saved Products
        </p>
        <hr className="my-3" />

        {savedItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Product
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Price
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {savedItems.map((item: any, index) => (
                  <tr key={index} className="hover:bg-grey-lighter">
                    <td className="py-4 px-6 border-b border-grey-light">
                      <div className="flex items-center">
                        <img
                          src={item?.image}
                          alt=""
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-full mr-4"
                        />
                        <span>{item?.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-grey-light">
                      ${item?.price?.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 border-b border-grey-light">
                      <div className="flex items-center justify-center lg:justify-start">
                        <button
                          className="font-titleFont font-medium bg-yellow-500 text-white border duration-200 p-2 rounded-md mt-3 lg:mt-0 flex items-center"
                          onClick={() => moveToCartHandler(item.id)}
                        >
                          <span className="mr-1">Move to Cart</span>
                          <RiArrowRightLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No saved Products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddToCartPage;
