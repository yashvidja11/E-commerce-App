import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SlList } from "react-icons/sl";
import { useParams } from "react-router";
import { RootState } from "../redux/store";
import { Timeline, Text } from "@mantine/core";
import PDF from "../components/InvoicePDFDownload";

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams();
  const orders = useSelector((state: RootState) => state.ordersData.orders);
  const orderDetails = orders.find((data) => data.id === orderId);

  const [isActive, setIsActive] = useState<number>(0);

  useEffect(() => {
    if (orderDetails) {
      const placedDate = new Date(orderDetails.date);
      const shippingDate = new Date(orderDetails.estimatedDeliveryDate);
      const deliveredDate = new Date(orderDetails.deliverydate);
      const currentTime = new Date().getHours();
      const currentDate = new Date().getDate();

      if (placedDate.getDate() === currentDate) {
        setIsActive(1);
      } else if (shippingDate.getDate() === currentDate) {
        setIsActive(2);
      } else if (deliveredDate.getDate() === currentDate && currentTime >= 6) {
        setIsActive(3);
      }
    }
  }, [orderDetails]);

  const formatDate = (dateString: string) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
    } as const;
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  if (!orderDetails) {
   
    return <div>Loading or Error message...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 py-4 px-4 bg-neutral-100">
        <div className="bg-white mb-3  border-2 border-gray-300 rounded-lg px-3 drop-shadow-md hover:drop-shadow-xl hover:border-yellow-500">
          <div className="border-b-2 py-2 border-yellow-500 flex align-center justify-center gap-2">
            <span className="py-1 text-2xl text-yellow-500">
              <SlList />
            </span>{" "}
            <h1 className="text-2xl text-gray-700">ORDER DETAILS</h1>
          </div>
          <div className="details1 py-2 mb-2">
            <p className="font-medium text-gray-700">Order id:</p>
            <h2 className="font-bold">{orderDetails.id}</h2>

            <p className="font-medium text-gray-700">Placed:</p>
            <h2 className="font-bold">{formatDate(orderDetails?.date)}</h2>
          </div>

          <div className="total mb-2 border-b-2 border-yellow-500">
            <p className="font-medium text-gray-700">Total:</p>
            <p className="font-bold flex py-0 items-center">
              ${orderDetails.totalAmount}
            </p>
          </div>

          <div className="address py-2 mb-2 border-b-2 border-yellow-500">
            <h1 className="font-bold text-gray-700">Shipping Address:</h1>
            <p className="address details">
              {orderDetails.address.streetAddress},{" "}
              {orderDetails.address.townCity}, {orderDetails.address.country}
            </p>
          </div>
          <div className="border-b-2 py-2 border-yellow-500">
            <p className="text-2xl pb-3 font-600">Order Status</p>
            <Timeline active={isActive} bulletSize={22} lineWidth={5}>
              <Timeline.Item
                title={`Order Confirmed ${formatDate(orderDetails?.date)}`}
              >
                <Text color="dimmed" size="sm">
                  Your order has been confirmed
                </Text>
                <Text size="xs" mt={4}>
                  {formatDate(orderDetails?.date)}
                </Text>
              </Timeline.Item>

              <Timeline.Item
                title={`Shipped, ${formatDate(
                  orderDetails?.estimatedDeliveryDate
                )}`}
              >
                <Text color="dimmed" size="sm">
                  Your order has been shipped
                </Text>
                <Text size="xs" mt={4}>
                  {formatDate(orderDetails?.estimatedDeliveryDate)}
                </Text>
              </Timeline.Item>

              <Timeline.Item title="Out For Delivery" lineVariant="dashed">
                <Text color="dimmed" size="sm">
                  Your order is out for delivery
                </Text>
                <Text size="xs" mt={4}>
                  Estimated Delivery :{formatDate(orderDetails?.deliverydate)}
                </Text>
              </Timeline.Item>

              <Timeline.Item
                title={`Delivered, ${formatDate(
                  orderDetails?.deliverydate
                )}  By 6 PM`}
              >
                <Text color="dimmed" size="sm">
                  Your order has been delivered
                </Text>
                <Text size="xs" mt={4}>
                  Delivered on: {formatDate(orderDetails?.deliverydate)}
                </Text>
              </Timeline.Item>
            </Timeline>
          </div>
          {/* <div className="delivrydetails">
            <div>
              <h1 className=" text-lg">
                {orderDetails.order.length} items Delivered
              </h1>
            </div>

            <p className="font-medium">Package delivered on</p>
            <p className="font-semibold text-gray-700">{formatDate(orderDetails.deliverydate)}</p>
            <div className="tracking map"></div>
          </div> */}

          <div className="productslist my-2 flex flex-col border-b-2 border-yellow-500 ">
            {orderDetails.order.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row px-3 py-2 w-auto mb-2 md:w-full justify-between hover:border border-yellow-500 "
              >
                <div className=" flex items-center gap-4">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-40 h-40 border border-1 border-black "
                  />
                  <p className="w-40">{item.title}</p>
                </div>

                <div className=" w-20 flex items-center px-2 my-3 ">
                  <p className="font-bold  flex align-center">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="download w-full my-2 py-2">
            <PDF ordersData={orderDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
