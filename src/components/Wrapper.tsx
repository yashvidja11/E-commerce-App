import React from "react";
import { FaTruck, FaIdCard, FaShieldAlt, FaHeadset } from "react-icons/fa";

const Wrapper: React.FC = () => {
  const data = [
    {
      cover: <FaTruck className="text-4xl text-blue-500 mx-auto mb-4" />,
      title: "Worldwide Delivery",
      desc: "We offer competitive prices on our 100 million plus products.",
    },
    {
      cover: <FaIdCard className="text-4xl text-green-500 mx-auto mb-4" />,
      title: "Safe Payment",
      desc: "We offer competitive prices on our 100 million plus products.",
    },
    {
      cover: <FaShieldAlt className="text-4xl text-red-500 mx-auto mb-4" />,
      title: "Shop With Confidence",
      desc: "We offer competitive prices on our 100 million plus products.",
    },
    {
      cover: <FaHeadset className="text-4xl text-purple-500 mx-auto mb-4" />,
      title: "24/7 Support",
      desc: "We offer competitive prices on our 100 million plus products.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((val, index) => (
          <div
            className="product bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:bg-black hover:text-white"
            key={index}
          >
            <div className="img icon-circle mx-auto mb-6">
              {val.cover}
            </div>
            <h3 className="font-semibold text-lg mb-2 hover:text-white">{val.title}</h3>
            <p className="">{val.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wrapper;
