import React from "react";

const customers = [
  {
    username: "ragini_singh",
    image:
      "https://i.pinimg.com/736x/82/62/4a/82624a1dbf495ffcc9ed17eeeb8a54ed.jpg",
  },
  {
    username: "rahul_s",
    image:
      "https://i.pinimg.com/736x/7a/e5/4c/7ae54cd93f3909858f19595247e5b1ce.jpg",
  },
  {
    username: "sneha6392",
    image:
      "https://i.pinimg.com/1200x/09/b7/8a/09b78a87256692629103695c50836fb4.jpg",
  },
  {
    username: "manya_m",
    image:
      "https://i.pinimg.com/736x/c3/e0/ff/c3e0ff874c54abde6c9f2ed13093c3d8.jpg",
  },
  {
    username: "ravi",
    image:
      "https://i.pinimg.com/736x/2c/3a/c3/2c3ac337919749e5280fe6e9aad4256b.jpg",
  },
  {
    username: "saif_ali",
    image:
      "https://i.pinimg.com/1200x/c2/31/9c/c2319c925555c8b07468cc1357e9c20a.jpg",
  },
];

const HappyCustomers = () => {
  return (
    <section className="px-4 py-10 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Our Happy Customers
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Share your style with{" "}
          <span className="font-semibold" style={{ color: "#FFCC00" }}>
            #HappyShopping
          </span>{" "}
          &{" "}
          <span className="font-semibold" style={{ color: "#FFCC00" }}>
            #UrbanTalesFam
          </span>
        </p>
      </div>

      {/* Customer Images */}
      <div className="flex justify-center gap-6 flex-wrap">
        {customers.map((customer, index) => (
          <div key={index} className="text-center">
            <div className="w-40 h-52 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
              <img
                src={customer.image}
                alt={customer.username}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-gray-700 font-medium">
              {customer.username}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HappyCustomers;
