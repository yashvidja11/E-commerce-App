import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addressInfo } from "../redux/features/address/addressSlice";
import { ordersInfo } from "../redux/features/ordersData/orderDataSlice";
import { v4 as uuidv4 } from "uuid";
import { resetCart } from "../redux/features/addtocart/cartSlice";
import cartImg from "../assets/images/cards.png";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

interface FormValues {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  country?: string;
  streetAddress?: string;
  streetAddress2?: string;
  townCity?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  emailAddress?: string;
  orderNotes?: string;
  shipping?: string;
  paymentMethod?: string;
}

const shippingOptions = [
  "Free Shipping",
  "Standard Shipping",
  "Express Shipping",
];
const paymentOptions = [
  "Direct Bank Transfer",
  "Check Payment",
  "Cash on Delivery",
  "Paypal",
  "Credit Card ",
];

const paymentDescriptions: Record<string, string> = {
  "Direct Bank Transfer":
    "Pay directly through bank transfer. Please use the provided account details to complete your payment. ",
  "Check Payment":
    "Pay with a physical check. Please mail the check to our office address. ",
  "Cash on Delivery": "Pay in cash only when your order is delivered. ",
  Paypal:
    "Pay securely through Paypal. You will be redirected to the Paypal website to complete your payment. ",
};

const shippingPrices: Record<string, number> = {
  "Free Shipping": 0,
  "Standard Shipping": 10,
  "Express Shipping": 20,
};

const schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .matches(
      /^[a-zA-Z]*$/,
      "First Name cannot contain numbers, white spaces, or special characters"
    ),

  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .matches(
      /^[a-zA-Z]*$/,
      "Last Name cannot contain numbers, white spaces, or special characters"
    ),

  companyName: Yup.string(),

  country: Yup.string()
    .required("Country is required")
    .matches(
      /^[a-zA-Z]*$/,
      "Country cannot contain numbers, white spaces, or special characters"
    ),

  streetAddress: Yup.string().required("Street Address is required"),
  streetAddress2: Yup.string(),

  townCity: Yup.string()
    .required("Town/City is required")
    .matches(
      /^[a-zA-Z]*$/,
      "Town/City cannot contain numbers, white spaces, or special characters"
    ),

  state: Yup.string()
    .required("State is required")
    .matches(
      /^[a-zA-Z]*$/,
      "State cannot contain numbers, white spaces, or special characters"
    ),

  postalCode: Yup.string()
    .required("Postal Code/Zip is required")
    .matches(
      /^\d{6}$/,
      "Postal Code must be a 6-digit number without spaces or special characters"
    ),

  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must be numeric and cannot contain white spaces")
    .test(
      "phone-length",
      "Phone number must be at least 10 digits",
      (value) => value?.replace(/\D/g, "").length >= 10
    ),

  orderNotes: Yup.string(),
  shipping: Yup.string().required("Shipping method is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
});

const CheckoutPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { login } = useSelector((state: RootState) => state.auth);
  const [selectedShippingPrice, setSelectedShippingPrice] = useState<any>(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const { cart, totalPrice } = useSelector(
    (state: RootState) => state.cartData as any
  );
  const gstAmount = ((totalPrice * 5) / 100).toFixed(2);

  const togglePaymentMethod = (option: string) => {
    if (option === selectedPaymentMethod) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(option);
    }
  };

  function httpGetAsync(url: any, callback: any) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }

  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=a7275032fd6a4fcaa02e01d028a1cea5&email=${login.email}`;

  function handleResponse(responseText: any) {
    console.log(responseText);
  }

  const totalAmount =
    parseFloat(totalPrice) +
    parseFloat(gstAmount) +
    parseFloat(selectedShippingPrice);

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const orderData = JSON.parse(localStorage.getItem("orderData") || "[]");
    const currentDate = new Date();
    const todayDate = new Date(currentDate);
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 5);
    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(currentDate.getDate() + 2);

    dispatch(addressInfo(data));
    localStorage.setItem("address", JSON.stringify(data));
    const ordersData = {
      id: uuidv4(),
      order: cart,
      totalAmount: totalAmount.toFixed(2),
      address: data,
      date: todayDate.toISOString(),
      deliverydate: futureDate.toISOString(),
      estimatedDeliveryDate: estimatedDeliveryDate.toISOString(),
    };

    dispatch(ordersInfo(ordersData));

    orderData.push(ordersData);
    localStorage.setItem("orderData", JSON.stringify(orderData));

    if (cart.length > 0) {
      setIsPopupOpen(true);
    }
    localStorage.removeItem("cart");
    dispatch(resetCart());

    httpGetAsync(url, handleResponse);
  };

  useEffect(() => {
    setValue("shipping", "Standard Shipping");
    setSelectedShippingPrice(shippingPrices["Standard Shipping"]);
    setValue("paymentMethod", "Direct Bank Transfer");
  }, [setValue]);

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="firstName" className="block">
                  First Name: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="lastName" className="block">
                  Last Name: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="streetAddress" className="block">
                Street Address :
              </label>
              <input
                type="text"
                id="streetAddress"
                className={`w-full border rounded-md px-3 py-2 mb-2 ${
                  errors.streetAddress ? "border-red-500" : ""
                }`}
                placeholder="House Number and Street"
                {...register("streetAddress")}
              />
              {errors.streetAddress && (
                <p className="text-red-500">{errors.streetAddress.message}</p>
              )}
              <input
                type="text"
                id="streetAddress2"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.streetAddress2 ? "border-red-500" : ""
                }`}
                placeholder="Apartments, Suite, Unit, etc."
                {...register("streetAddress2")}
              />
              {errors.streetAddress2 && (
                <p className="text-red-500">{errors.streetAddress2.message}</p>
              )}
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="townCity" className="block">
                  Town/City: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="townCity"
                  placeholder="Enter your Town/City name"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.townCity ? "border-red-500" : ""
                  }`}
                  {...register("townCity")}
                />
                {errors.townCity && (
                  <p className="text-red-500">{errors.townCity.message}</p>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="state" className="block">
                  State: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="Enter your state name"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.state ? "border-red-500" : ""
                  }`}
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block">
                Country: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter your country name"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.country ? "border-red-500" : ""
                }`}
                {...register("country")}
              />
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="postalCode" className="block">
                  Postal Code/Zip: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Enter your postal code or zip"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.postalCode ? "border-red-500" : ""
                  }`}
                  {...register("postalCode")}
                />
                {errors.postalCode && (
                  <p className="text-red-500">{errors.postalCode.message}</p>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="phone" className="block">
                  Phone: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone number"
                  className={`w-full border rounded-md px-3 py-2 ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="orderNotes" className="block">
                Order Notes (Optional):
              </label>
              <textarea
                id="orderNotes"
                className={`w-full border rounded-md px-3 py-2 ${
                  errors.orderNotes ? "border-red-500" : ""
                }`}
                placeholder="Notes about your order"
                {...register("orderNotes")}
              />
              {errors.orderNotes && (
                <p className="text-red-500">{errors.orderNotes.message}</p>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="border rounded-md p-4 bg-white">
              <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Product</span>
                  <span>Price</span>
                </div>
                {cart.map((item: any) => (
                  <div className="flex justify-between mb-2" key={item.id}>
                    <div className="flex gap-2">
                      <img src={item.image} className="w-12 h-12" alt="" />
                      <span className="w-52">{item.title}</span>
                    </div>
                    <span>
                      ${item.price} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span id="subtotal">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <p>GST Amount ({5}%):</p>
                  <p>${gstAmount}</p>
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <div className="mb-4">
                <span className="block">Shipping:</span>
                <div className="mt-2">
                  {shippingOptions.map((option: any) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        value={option}
                        {...register("shipping")}
                        onChange={() => {
                          setSelectedShippingPrice(shippingPrices[option]);
                        }}
                      />
                      <span className="ml-2">{option}</span>
                      <span className="ml-auto">
                        ${shippingPrices[option].toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.shipping && (
                  <p className="text-red-500">{errors.shipping.message}</p>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>Total Payable Amount:</span>
                  <span id="total">
                    $
                    {(
                      Number(totalPrice) +
                      Number(gstAmount) +
                      Number(selectedShippingPrice)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              <hr className="my-4 border-t border-gray-300" />

              <div className="mb-4">
                <label className="block">Payment Methods:</label>
                <div className="mt-2">
                  {paymentOptions.map((option) => (
                    <div key={option}>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          value={option}
                          {...register("paymentMethod")}
                          onChange={() => togglePaymentMethod(option)}
                        />
                        <span className="ml-2">{option}</span>
                      </label>

                      {option === "Credit Card " &&
                        selectedPaymentMethod === option && (
                          <div>
                            <img
                              src={cartImg}
                              alt="Cart"
                              className="w-64 h-26 my-4 mx-auto"
                            />
                            <div className="ml-4 mt-2 border rounded p-3">
                              <div className="mb-4">
                                <label
                                  htmlFor="cardNumber"
                                  className="block text-gray-700"
                                >
                                  Card Number:
                                </label>
                                <input
                                  type="text"
                                  id="cardNumber"
                                  className="bg-white border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500 w-full"
                                  placeholder="**** **** **** ****"
                                />
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="cardHolderName"
                                  className="block text-gray-700"
                                >
                                  Card Holder Name:
                                </label>
                                <input
                                  type="text"
                                  id="cardHolderName"
                                  className="bg-white border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500 w-full"
                                  placeholder="John Doe"
                                />
                              </div>

                              <div className="flex mb-4">
                                <div className="w-1/2 pr-2">
                                  <label
                                    htmlFor="expiryDate"
                                    className="block text-gray-700"
                                  >
                                    Expiry Date:
                                  </label>
                                  <input
                                    type="text"
                                    id="expiryDate"
                                    className="bg-white border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500 w-full"
                                    placeholder="MM/YY"
                                  />
                                </div>
                                <div className="w-1/2 pl-2">
                                  <label
                                    htmlFor="cvv"
                                    className="block text-gray-700"
                                  >
                                    CVV:
                                  </label>
                                  <input
                                    type="password"
                                    id="cvv"
                                    className="bg-white border rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500 w-full"
                                    placeholder="123"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      {option === selectedPaymentMethod && (
                        <p className="text-gray-600 text-sm mt-2">
                          {paymentDescriptions[option]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500">{errors.paymentMethod.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-black  text-white hover:text-yellow-500 py-2 px-4 rounded mt-4 w-full"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Order Successful
            </h2>
            <p className="text-gray-700">
              Your order has been successfully completed. Thank you for choosing
              us for your purchase!
            </p>
            <p className="mt-3 text-gray-700">
              Order ID: <span className="font-semibold">{uuidv4()}</span>
            </p>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={closePopup}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <span className="flex items-center gap-1">
                  <Link to="/">Close</Link>
                  <ImCancelCircle />
                </span>
              </button>
              <Link
                to="/order"
                className="bg-black text-white hover:text-yellow-500 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Go to Order Page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
