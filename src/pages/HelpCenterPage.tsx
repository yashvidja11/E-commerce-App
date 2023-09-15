import React, { useState } from "react";
import { Link } from "react-router-dom";

const HelpCenterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        'To create an account, click on the "Sign Up" button on the top right corner of the homepage. Fill in your details and follow the prompts to complete the registration process.',
    },
    {
      question: "How do I reset my password?",
      answer:
        'If you have forgotten your password, click on the "Forgot Password" link on the login page. Enter your email address and follow the prompts to reset your password.',
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on the courier's website.",
    },
    {
      question: "How do I return a product?",
      answer:
        'To return a product, go to your account, navigate to the "Order History" section, select the order containing the product you want to return, and follow the instructions for returns.',
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, PayPal, and other secure payment methods. You can choose your preferred payment method during checkout.",
    },
  ];

  const accountManagementFaqs = [
    {
      question: "How do I update my account information?",
      answer:
        'To update your account information, log in to your account and click on the "My Account" link in the top right corner of the page. From there, you can update your personal information, shipping address, and payment methods.',
    },
    {
      question: "How do I view my order history?",
      answer:
        'To view your order history, log in to your account and click on the "My Account" link in the top right corner of the page. From there, click on the "Order History" tab to see a list of all your past orders.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>

        <input
          type="text"
          placeholder="Search FAQs..."
          className="border rounded p-2 w-full mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow-lg hover:shadow-xl transition mb-4"
            onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
          >
            <div className="text-lg font-semibold mb-2 hover:text-blue-600 focus:outline-none">
              {faq.question}
            </div>
            {index === activeIndex && (
              <p className="text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <p className="text-gray-700">
              <strong>Email:</strong>
              <Link
                className="text-blue-600 ml-2"
                to="mailto:support@multimart.com"
              >
                support@multimart.com
              </Link>
            </p>
          </div>
          <div className="mb-2">
            <p className="text-gray-700">
              <strong>Phone:</strong>
              <Link className="text-blue-600 ml-2" to="tel:+11234567890">
                +1 (123) 456-7890
              </Link>
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <strong>Hours of Operation:</strong>
              <span className="font-semibold ml-2">
                Monday to Friday, 9 am to 5 pm EST
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
        <ul>
          {accountManagementFaqs.map((faq, index) => (
            <li key={index} className="mb-4">
              <div
                className="text-lg font-semibold hover:text-blue-600 focus:outline-none"
                onClick={() =>
                  setActiveIndex(index === activeIndex ? -1 : index)
                }
              >
                {faq.question}
              </div>
              {index === activeIndex && (
                <p className="text-gray-600">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HelpCenterPage;
