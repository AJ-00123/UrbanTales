import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    title: "TheGiftKart Shockproof Crystal Clear Back Cover Case",
    mainImage:
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Purple-5_800x.jpg?v=1727357376",
    price: 199,
    mrp: 999,
    smallImages: [
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Brown-9_800x.jpg?v=1727357396",
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Pink-10_800x.jpg?v=1727357401",
      "https://www.exoticase.com/cdn/shop/files/KeepCool-Camera-Protect-MagSafe-iPhone-Case-Exoticase-For-iPhone-16-Pro-Max-Dark-Green-8_800x.jpg?v=1727357391",
    ],
    heading: "Keep shopping for",
  },
  {
    title: "YELONA Gorilla Grip Durable Kitchen Cutting Board Set of 3",
    mainImage:
      "https://s.alicdn.com/@sc04/kf/A72985e53e4294e76ac33d971b3edef0f8.jpg_720x720q50.jpg",
    price: 749,
    mrp: 1999,
    smallImages: [
      "https://s.alicdn.com/@sc04/kf/Ha69f187a2fb949eb9a0eddd522bd8ba48.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/H3eddaab0557346c9942fc8805e662606M.jpg_720x720q50.jpg",
      "https://s.alicdn.com/@sc04/kf/Hb9d41cbe8ba34062a6518fac4f436742D.jpg_720x720q50.jpg",
    ],
    heading: "Up to 60% off | Top kitchen essentials nearby",
  },
  {
    title: "eightone Women Floral Print Cotton Midi Dress",
    mainImage:
      "https://i.pinimg.com/736x/ff/aa/2d/ffaa2d1e18872b06e95a4d8b393e6e3a.jpg",
    price: 670,
    mrp: 1999,
    smallImages: [
      "https://i.pinimg.com/736x/b6/52/1e/b6521e1258ab935cf5b4eb705f02610e.jpg",
      "https://i.pinimg.com/736x/ee/e8/8e/eee88e5ecfef1a0405edfecc4faa079a.jpg",
      "https://i.pinimg.com/736x/0f/f8/75/0ff875c7298e459964264782da3a0ff1.jpg",
    ],
    heading: "Up to 75% off | Casual ready from Small Businesses",
  },
  {
    title: "YELONA Gorilla Grip Cutting Board (Alt Listing)",
    mainImage:
      "https://m.media-amazon.com/images/I/611fDFAhGgL._AC_SY350_.jpg",
    price: 749,
    mrp: 1999,
    smallImages: [
      "https://m.media-amazon.com/images/I/61eRCp5blLL._AC_SY110_.jpg",
      "https://m.media-amazon.com/images/I/71y2aqXqVHL._AC_SY110_.jpg",
    ],
    heading: "Pick up where you left off",
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();
  const handleCardClick = (product) => {
    const query = new URLSearchParams({
      title: product.title,
      mainImage: product.mainImage,
      price: product.price,
      mrp: product.mrp,
      smallImages: product.smallImages.join(","),
    }).toString();
    navigate(`/product_detail?${query}`);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 font-inter">
      <h2 className="text-3xl font-extrabold text-center text-[#070A52] mb-10">
         Top Picks For You 
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300 flex flex-col justify-between"
            onClick={() => handleCardClick(product)}
          >
            {/* Heading */}
            <h3 className="font-semibold text-lg text-[#070A52] mb-3 line-clamp-2">
              {product.heading}
            </h3>

            {/* Main Image */}
            <div className="h-44 flex justify-center items-center bg-gray-50 rounded-xl overflow-hidden mb-4">
              <img
                src={product.mainImage}
                alt={product.title}
                className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Price */}
            <div className="text-lg font-bold text-gray-800 mb-3">
              ₹{product.price}
              {product.mrp && (
                <span className="text-sm text-gray-500 line-through ml-1">
                  ₹{product.mrp}
                </span>
              )}
            </div>

            {/* Small Images */}
            <div className="flex gap-2 flex-wrap mb-4">
              {product.smallImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`small-${i}`}
                  className="w-10 h-10 rounded-md border border-gray-200 hover:border-[#070A52] transition"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
