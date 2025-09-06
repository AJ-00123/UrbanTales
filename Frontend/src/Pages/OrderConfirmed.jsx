import React from "react";
import { useNavigate } from "react-router-dom";
import orderConfirmedGif from "../assets/order-confirmed.gif"; // Ensure this path is correct
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const OrderConfirmed = () => {
  const navigate = useNavigate();

  return (
    <>
        <Navbar />
    <div className="flex items-center justify-center p-5 bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#070A52] mb-6">Order Confirmed!</h1>

        {/* GIF */}
        <img
          src={orderConfirmedGif}
          alt="Order Confirmed"
          className="mx-auto w-64 h-64 object-contain mb-6"
        />

        {/* Continue Shopping Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#070A52] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default OrderConfirmed;
