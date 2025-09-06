import React from "react";

const products = [
  {
    name: "Wireless Headphones",
    desc: "Noise-cancelling with 30 hours battery life.",
    img: "https://i.pinimg.com/736x/8c/db/e1/8cdbe123010c380e20f264a8fdd57938.jpg",
  },
  {
    name: "Fitness Band",
    desc: "Track workouts, sleep, and heart rate.",
    img: "https://i.pinimg.com/736x/d4/39/13/d43913c7eba213b38eff4bbd8812303b.jpg",
  },
  {
    name: "4K Smart TV",
    desc: "Smart apps and vibrant visuals.",
    img: "https://i.pinimg.com/736x/b7/0d/aa/b70daaa7cbd8b252c63ef180eb5e1608.jpg",
  },
  {
    name: "Office Chair",
    desc: "Ergonomic and breathable for long workdays.",
    img: "https://i.pinimg.com/736x/7a/3c/5c/7a3c5ca272bf8f2e4b2ad7c0f2d97632.jpg",
  },
  {
    name: "Analog Watch",
    desc: "Minimalist leather strap wristwatch.",
    img: "https://i.pinimg.com/736x/9f/28/ec/9f28ecf9eb6d0aa6d8273d2070444b95.jpg",
  },
  {
    name: "Portable Blender",
    desc: "Rechargeable on-the-go smoothie maker.",
    img: "https://i.pinimg.com/736x/0e/3a/ae/0e3aae87c04d0bb998d1fdc069596eab.jpg",
  },
  {
    name: "LED Strip Lights",
    desc: "Smart multicolor ambiance with remote.",
    img: "https://i.pinimg.com/736x/36/1f/f8/361ff84684094557c5c5e42e3fd8e761.jpg",
  },
  {
    name: "Eco Water Bottle",
    desc: "Reusable and keeps cold for 24 hrs.",
    img: "https://i.pinimg.com/736x/b3/9b/f4/b39bf4589291b85da295b735dc8c1336.jpg",
  },
  {
    name: "Charging Stand",
    desc: "Wireless fast charging dock.",
    img: "https://i.pinimg.com/736x/f5/9d/00/f59d0051f94b71d26500529a02c018d3.jpg",
  },
  {
    name: "Gaming Mouse",
    desc: "RGB lighting with adjustable DPI.",
    img: "https://i.pinimg.com/736x/65/84/17/6584175af17d1067d0259f42611d15aa.jpg",
  },
];

const TrendingProducts = () => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Trending on social media
        </h1>

        {/* Scrollable Product Cards */}
        <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar">
          {products.map((product, index) => (
            <div
              key={index}
              className="min-w-[300px] h-[400px] rounded-md relative bg-cover bg-center text-white flex-shrink-0"
              style={{ backgroundImage: `url('${product.img}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-md"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-lg text-gray-300">{product.name}</p>
                <p className="text-sm text-gray-300">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
