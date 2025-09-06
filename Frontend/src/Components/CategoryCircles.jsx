import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Fashion",
    image: "https://i.pinimg.com/1200x/16/ea/40/16ea40729954d9f7955c0aa18b5311a7.jpg",
    category: "fashion",
  },
  {
    id: 2,
    name: "Electronics",
    image: "https://i.pinimg.com/736x/a3/4a/d1/a34ad1d68f5c3f01d7fb21119c556ffe.jpg",
    category: "electronic",
  },
  {
    id: 3,
    name: "Furniture",
    image: "https://i.pinimg.com/736x/6b/27/24/6b2724cd4ec8013e4b537cd1c5a8893d.jpg",
    category: "furniture",
  },
  {
    id: 4,
    name: "Appliances",
    image: "https://i.pinimg.com/1200x/e1/b6/98/e1b698b84d069ca72d7bc57c5152ed82.jpg",
    category: "kitchen",
  },
  {
    id: 5,
    name: "Toys",
    image: "https://i.pinimg.com/736x/a7/ef/07/a7ef075291c451a438d5b737474b1957.jpg",
    category: "toys",
  },
  {
    id: 6,
    name: "Cosmetics",
    image: "https://i.pinimg.com/1200x/0a/b0/cc/0ab0cc09d08e1816b89f273e18a4dd74.jpg",
    category: "cosmetic",
  },
  {
    id: 7,
    name: "Kilos",
    image: "https://i.pinimg.com/1200x/56/2d/ed/562ded9c5674b296bf21256d5663e9ec.jpg",
    category: "food",
  },
  {
    id: 8,
    name: "Sports",
    image: "https://i.pinimg.com/1200x/91/37/75/9137759fe8d4bd3692e1538f4edd400a.jpg",
    category: "sports",
  },
];

function CategoryCircles() {
  return (
    <section className="bg-gray-50 px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6 place-items-center">
        {categories.map((cat) => (
          <Link
            to={`/category?cat=${cat.category}`}
            key={cat.id}
            className="group flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            {/* Circle Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden  ">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:brightness-110"
              />
            </div>

            {/* Category Name */}
            <span className="text-sm mt-3 text-center font-semibold text-gray-700 group-hover:text-[#070A52] transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryCircles;
