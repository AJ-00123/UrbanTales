import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { HashLoader } from "react-spinners"; // Import HashLoader
// import logo from "../assets/Zarvoc2.png"; // No longer needed for loader
import "../Styles/Product.css";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    amount: "",
    price: "",
    image: "",
    delivery: ""
  });
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);

  const requiredFields = ["name", "category", "description", "amount", "price"];

  useEffect(() => {
    // Set a timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000); // Changed to 3000ms for 3 seconds

    fetch("http://localhost:3000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // If data fetching is faster than 3 seconds, the timer will still run.
        // If data fetching is slower, the loader will disappear once data is fetched.
        // For a consistent 3-second display, we rely solely on the timer.
      })
      .catch((err) => console.error("❌ Fetch error:", err));
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    const filled = requiredFields.every((field) => updatedForm[field].trim() !== "");
    setIsAddBtnDisabled(!filled);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddBtnDisabled) return;

    fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, data]);
        setFormData({
          name: "",
          category: "",
          description: "",
          amount: "",
          price: "",
          image: "",
          delivery: ""
        });
        setIsAddBtnDisabled(true);
      })
      .catch((err) => console.error("❌ Error:", err));
  };

  const handleRemoveProduct = (productToRemove) => {
    setProducts((prev) => prev.filter((product) => product !== productToRemove));
  };

  const handleFinish = () => {
    if (products.length === 0) {
      alert("Please add at least one product before finishing.");
      return;
    }
    window.location.href = "/dashboard";
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
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Product to sell</h2>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Add product</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select product category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Select Category --</option>
                  <option value="fashion">fashion</option>
                  <option value="electronic">electronic</option>
                  <option value="furniture">furniture</option>
                  <option value="kitchen">kitchen</option>
                  <option value="toys">toys</option>
                  <option value="cosmetic">cosmetic</option>
                  <option value="food">food</option>
                  <option value="sports">sports</option>
                  <option value="appliances">appliances</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Add product description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Add product amount</label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Add product price</label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Add product image (URL)</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Delivery charge</label>
                <input
                  type="text"
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isAddBtnDisabled}
              className={`w-full py-2 rounded-lg text-white font-semibold mt-4 ${
                isAddBtnDisabled
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              + Add more item
            </button>
          </form>

          {/* Product List */}
          <div className="mt-8">
            {products.map((prod, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4 shadow"
              >
                <p><strong>Product:</strong> {prod.name}</p>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Description:</strong> {prod.description}</p>
                <p><strong>Amount:</strong> {prod.amount}</p>
                <p><strong>Price:</strong> ₹{prod.price}</p>
                {prod.image && (
                  <img
                    src={prod.image}
                    alt="Product"
                    className="mt-2 max-w-[80px] max-h-[80px] rounded"
                  />
                )}
                <p><strong>Delivery:</strong> {prod.delivery}</p>
                <button
                  type="button"
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
                  onClick={() => handleRemoveProduct(prod)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleFinish}
            className="w-full mt-4 py-2 rounded-lg bg-[#070A52] hover:bg-[#FFCC00] text-white font-semibold"
          >
            Finish
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
