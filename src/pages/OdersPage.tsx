import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BsBox } from "react-icons/bs";
import { noDataFound } from "../assets/images";

const formatDate = (dateString: string) => {
  const options = { weekday: "short", day: "numeric", month: "short" } as const;
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
};
const Orderspage: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.ordersData);

  return (
    <div>
      <div className="px-3 py-2 bg-neutral-100">
        <div className="flex justify-center">
          <h1 className="text-2xl text-gray-700 px-7 flex align-center gap-2">
            <span className="text-yellow-500 py-1">
              <BsBox />
            </span>
            MY ORDERS:
          </h1>
        </div>
        {
          orders.length === 0 ? 
          <div className="flex justify-center items-center gap-2 mt-5">
                {" "}
                <img src={noDataFound} alt="" className="w-40 h-40" />
                <p className="fond-bold text-3xl">Opps... Order Not Found!</p>
              </div> : <div className="grid grid-cols-1 gap-4 px-7 py-3">
          <div className="w-auto">
            {orders.map((item: any) => (
              <div
                key={item.id}
                className="card1 bg-white  flex-col py-3 border-2 rounded-lg px-2 border-gray-400 drop-shadow-md hover:drop-shadow-xl mb-3 hover:border-yellow-500"
              >
                <div className="details1 mb-3">
                  <p className="font-medium">Order number:</p>
                  <h2 className="font-bold text-gray-700">{item.id}</h2>
                </div>
                <div className="details2 mb-3">
                  <h1 className="mb-1 font-semibold text-lg ">
                    {item.order.length} items Delivered
                  </h1>

                  <p className="font-medium text-gray-700">
                    Package delivered on{" "}
                    <span className="font-semibold">
                      {formatDate(item.date)}
                    </span>
                  </p>
                </div>
                <div className="flex">
                  <ul className="flex flex-col md:flex-row gap-2">
                    {item.order.map((data: any) => (
                      <li
                        key={data.id}
                        className="px-1 py-1 border border-1 border-black w-auto mb-2 md:w-40 hover:border-yellow-500"
                      >
                        <img
                          src={data.image}
                          alt={`Item ${data.id}`}
                          className="w-32 h-32"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="button w-full">
                  
                  <Link to={`/orderdetails/${item.id}`}>
                    <button className=" w-auto md:w-52 px-2 py-2 md:py-3 justify-self-center font-semibold bg-black text-white fontweight-200 border border-3 border-black rounded-lg hover:text-yellow-500">
                      ORDER DETAILS
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        }
        
      </div>
    </div>
  );
};

export default Orderspage;
