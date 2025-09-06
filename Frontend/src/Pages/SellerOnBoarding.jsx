import React, { useEffect, useState } from "react";
import "../Styles/SellerOnBoarding.css";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx"; // ✅ Footer imported
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners"; // Import HashLoader
// import logo from "../assets/Zarvoc2.png"; // No longer needed for loader

const SellerOnBoarding = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000); // Changed to 3000ms for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/sellerlogin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* HashLoader component with customizable color and size */}
        <HashLoader color="#070A52" size={80} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <div className="container">
          <div className="banner">
            <img
              src="https://img.freepik.com/premium-vector/work-from-home-concept-happy-woman-selling-products-online-home_218660-278.jpg?w=1380"
              alt="Ads"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
          <h2 className="text-xl font-semibold text-blue-700 my-6 text-center">🚀 How to become a seller</h2>
          <div className="steps">
            <div className="step-card">
              <div className="step-title">📝 Step 1: Register your account</div>
              <div className="step-image">
                <img
                  src="https://i.pinimg.com/736x/d8/8f/a4/d88fa43aa79db7dfd147f459b4c71d00.jpg"
                  alt="Register Account"
                />
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">📦 Step 2: Choose storage & shipping</div>
              <div className="step-image">
                <img
                  src="https://i.pinimg.com/736x/38/bd/e2/38bde2763e83f705839b7eb1ccca4178.jpg"
                  alt="Storage and Shipping"
                />
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">🛍️ Step 3: List your products</div>
              <div className="step-image">
                <img
                  src="https://i.pinimg.com/736x/91/7a/37/917a37e331d38bdeadad76e10abaf29a.jpg"
                  alt="List Products"
                />
              </div>
            </div>
            <div className="step-card">
              <div className="step-title">💸 Step 4: Complete orders & get paid</div>
              <div className="step-image">
                <img
                  src="https://i.pinimg.com/736x/d1/4e/ff/d14eff0a928847d42b7a86ccb93a6d26.jpg"
                  alt="Get Paid"
                />
              </div>
            </div>
          </div>

          <button onClick={handleClick} className="start-btn">
            🚀 Start Selling Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerOnBoarding;
