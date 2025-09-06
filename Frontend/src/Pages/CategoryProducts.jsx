import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import productData from "../Data/showProducts"; // Import full data

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryKey = params.get("cat");
    const subCategory = params.get("sub"); // For future subcategory filter

    if (categoryKey && productData[categoryKey]) {
      let fetchedProducts = [...productData[categoryKey]];

      // Filter if subcategory exists (you can map later)
      if (subCategory) {
        fetchedProducts = fetchedProducts.filter((p) =>
          p.name.toLowerCase().includes(subCategory.toLowerCase())
        );
      }

      setProducts(fetchedProducts);
    } else {
      setProducts([]);
    }
  }, [location.search]);

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-auto">
                  <p className="text-blue-600 font-bold text-xl mt-2">
                    ₹{product.price}
                  </p>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl py-10">No products available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
