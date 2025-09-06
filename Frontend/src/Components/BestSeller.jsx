import React from "react";
import { Heart, ShoppingBag } from "lucide-react";

// Demo data — replace with your API data
const bestSellers = [
  {
    brand: "RANGMANCH",
    name: "Teal Textured Below Knee Length Kurti",
    price: 779,
    oldPrice: 1299,
    discount: 40,
    image:
      "https://i.pinimg.com/1200x/b2/41/cb/b241cbe49815badd62fb0ce85a0e8ecb.jpg",
  },
  {
    brand: "RANGMANCH",
    name: "Medium Blue Embroidered Cotton Top",
    price: 844,
    oldPrice: 1299,
    discount: 35,
    image:
      "https://i.pinimg.com/736x/c2/f8/d2/c2f8d2086a829789f2ef09b13f253710.jpg",
  },
  {
    brand: "ANNABELLE",
    name: "Brown Solid Women Flare Pants",
    price: 909,
    oldPrice: 1299,
    discount: 30,
    image:
      "https://i.pinimg.com/736x/27/ee/9b/27ee9be6ec2800f22d7bf64e5124f0cf.jpg",
  },
  {
    brand: "Gizelle",
    name: "Gizelle Two Piece Set - Linen Look Short Sleeve Shirt & Shorts Set",
    price: 1329,
    oldPrice: 1899,
    discount: 30,
    image:
      "https://i.pinimg.com/1200x/fc/9e/7f/fc9e7fcfc2caa56dd8b1768f914efb0a.jpg",
  },
  {
    brand: "Aveloria",
    name: "Aveloria Floral Print Button Front Shirt",
    price: 909,
    oldPrice: 1299,
    discount: 30,
    image:
      "https://i.pinimg.com/736x/95/07/06/950706f8458ece429798b9ce6819233f.jpg",
  },
];

// Helper to format rupees with commas
const formatINR = (n) =>
  typeof n === "number"
    ? n.toLocaleString("en-IN", { maximumFractionDigits: 0 })
    : n;

const BestSellers = () => {
  return (
    <section className="px-4 py-12 bg-[#F9FAFB]">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold  text-[#070A52]">
          Best Sellers
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
        {bestSellers.map((item, i) => (
          <BestSellerCard key={i} item={item} />
        ))}
      </div>

      {/* Mobile / Small Screen Swipe Row (no arrows) */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-gray-300">
          {bestSellers.map((item, i) => (
            <div key={i} className="snap-start shrink-0 w-[220px]">
              <BestSellerCard item={item} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ----------------- Card Component ----------------- */
const BestSellerCard = ({ item, compact = false }) => {
  const {
    brand,
    name,
    price,
    oldPrice,
    discount,
    image,
  } = item;

  const pct = typeof discount === "number" ? `${discount}% OFF` : discount;

  return (
    <article
      className="relative bg-white rounded-2xl shadow hover:shadow-xl transition-shadow duration-300 p-4 text-left border border-gray-100"
    >
      {/* Image block */}
      <div className="relative w-full overflow-hidden rounded-xl mb-4 aspect-[3/4] bg-gray-100">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating action icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
            aria-label="Add to bag"
            onClick={() => console.log("Add to bag:", name)}
          >
            <ShoppingBag className="w-4 h-4 text-[#070A52]" />
          </button>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
            aria-label="Add to wishlist"
            onClick={() => console.log("Wishlist:", name)}
          >
            <Heart className="w-4 h-4 text-[#070A52]" />
          </button>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-sm font-bold tracking-wide text-gray-800 uppercase">
        {brand}
      </h3>
      <p
        className={compact
          ? "text-xs text-gray-500 mt-1 line-clamp-2"
          : "text-sm text-gray-600 mt-1 line-clamp-2"}
        title={name}
      >
        {name}
      </p>

      {/* Pricing */}
      <div
        className={compact
          ? "mt-2 text-sm font-semibold text-gray-900"
          : "mt-2 text-base font-semibold text-gray-900"}
      >
        ₹ {formatINR(price)}{" "}
        {oldPrice && (
          <span className="text-gray-400 line-through ml-1 text-xs font-normal">
            ₹ {formatINR(oldPrice)}
          </span>
        )}{" "}
        {pct && (
          <span className="ml-1 text-xs font-bold text-[#FFCC00]">{pct}</span>
        )}
      </div>
    </article>
  );
};

export default BestSellers;
