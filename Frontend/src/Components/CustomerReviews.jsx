import React from "react";

const reviews = [
  {
    name: "John Doe",
    text: "SuperMarket always delivers fresh groceries on time. The variety and quality are unmatched!",
    image:
      "https://i.pinimg.com/736x/08/1a/03/081a03c39e724087a8152318c4c39d49.jpg",
  },
  {
    name: "Priya Sharma",
    text: "I love shopping at SuperMarket! The discounts and offers are great, and the service is excellent.",
    image:
      "https://i.pinimg.com/736x/53/5e/ca/535eca1fe2ef89daf5d6f51eb93058b4.jpg",
  },
  {
    name: "Amit Verma",
    text: "The customer support at SuperMarket highly recommended for daily needs!",
    image:
      "https://i.pinimg.com/736x/86/bc/f3/86bcf364a2d6328d9b9cd00e4edee2b4.jpg",
  },
  {
    name: "Sara Lee",
    text: "Great experience every time! SuperMarket makes grocery shopping easy and convenient.",
    image:
      "https://i.pinimg.com/736x/38/24/3e/38243e5bcf61681efd377c461f19fde7.jpg",
  },
];

const ReviewCard = ({ name, text, image }) => (
  <div className="bg-[#d8d8d8] rounded-[18px] w-[22vw] min-w-[260px] max-w-[340px] h-[260px] relative flex flex-col items-center justify-end mb-8">
    <div className="absolute -top-[73px] left-1/2 transform -translate-x-1/2 w-[110px] h-[110px] bg-white rounded-full border-[4px] border-[#efefef] flex items-center justify-center overflow-hidden z-10">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
    <div className="font-bold text-[1.1rem] mt-[70px] mb-1 text-center">
      {name}
    </div>
    <div className="text-base text-[#333] mb-3 text-center px-3">{text}</div>
    <div className="mb-8 mt-6 text-center text-[#e7d069] text-[2rem] drop-shadow">
      {"★★★★★"}
    </div>
  </div>
);

const CustomerReviews = () => {
  return (
    <section className="bg-[#efefef] pt-4 pb-12 w-full font-sans relative">
      <h2 className="text-[2.5rem] font-semibold text-center mb-[20px]">Customer Reviews</h2>

      <div className="flex flex-wrap justify-around gap-3 px-8 mt-25">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
