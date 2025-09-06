import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { HashLoader } from "react-spinners"; // Import HashLoader
// import logo from "../assets/Zarvoc2.png"; // No longer needed for loader

const SellerForm = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    category: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
    country: "",
    shipping: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [allFilled, setAllFilled] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const fileInputRef = useRef();

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000); // Changed to 3000ms for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setAllFilled(Object.values(updatedForm).every((val) => val.trim() !== ""));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/sellers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      alert("✅ Seller registered successfully");
      window.location.href = "/productdetails";

    } catch {
      alert("❌ Error submitting form");
    }
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 space-y-4"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Tell us about your business
            </h2>

            {[
              { name: "shopName", label: "Set a name for your shop" },
              { name: "category", label: "Select product category" },
              { name: "pincode", label: "Pin code" },
              { name: "address", label: "Enter your business address" },
              { name: "city", label: "City" },
              { name: "state", label: "State" },
              { name: "country", label: "Country" },
              {
                name: "shipping",
                label: "Shipping option (Self shipping or partner shipping)",
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={!allFilled}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                allFilled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>

          {/* Image Upload */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="mb-4 px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200"
            >
              Upload Shop Image
            </button>
            <input
              type="file"
              id="shopImage"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div className="w-full max-w-md bg-white border border-blue-100 shadow rounded-lg flex flex-col items-center justify-center p-4">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Shop Preview"
                    className="max-h-80 object-contain rounded-lg"
                  />
                  <p className="text-sm mt-2 text-blue-600 font-medium">
                    Preview
                  </p>
                </>
              ) : (
                <p className="text-gray-500 font-medium">No image selected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerForm;
