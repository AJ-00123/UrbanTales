const productData = {
  cosmeticProducts: [
    {
        id: 1,
        name: "Maybelline Fit Me Foundation",
        description: "Matte and poreless liquid foundation for natural-looking coverage.",
        price: 499,
        image: "https://m.media-amazon.com/images/I/51uTj0beKCL._UF1000,1000_QL80_.jpg",
        rating: 4.6
    },
    {
        id: 2,
        name: "Lakmé Eyeconic Kajal",
        description: "Smudge-proof and waterproof kajal with long-lasting wear.",
        price: 199,
        image: "https://www.netmeds.com/images/product-v1/400x400/891953/lakme_eyeconic_kajal_twin_pack_24h_deep_black_2_x_0_35_gm_2s_84675_1_1.webp",
        rating: 4.5
    },
    {
        id: 3,
        name: "L'Oréal Paris Infallible Lipstick",
        description: "Bold, long-wearing matte lipstick with a smooth finish.",
        price: 799,
        image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:540/1149865/2kLKD-db1I-1149865_1.jpg",
        rating: 4.4
    },
    {
        id: 4,
        name: "Maybelline Lash Sensational Mascara",
        description: "Volumizing mascara for fan-like lashes.",
        price: 399,
        image: "https://cdn.grofers.com/app/images/products/sliding_image/495637a.jpg?ts=1704191290",
        rating: 4.6
    },
    {
        id: 5,
        name: "Mamaearth Ubtan Face Wash",
        description: "Natural face wash with turmeric and saffron for glowing skin.",
        price: 249,
        image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/d6ad3cf6-e207-4107-b655-b0e9ebc7e4b0.jpg?ts=1708755733",
        rating: 4.3
    },
    ],
    electronic: [
    {
        id: 1,
        name: "MacBook Pro 16″",
        description: "Sleek design meets powerful performance for seamless creativity and productivity, anywhere.",
        price: 199900,
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=892&hei=820&fmt=jpeg&qlt=90&.v=YnlWZDdpMFo0bUpJZnBpZjhKM2M3VGhTSEZFNjlmT2xUUDNBTjljV1BxWjZkZE52THZKR1lubXJyYmRyWWlhOXZvdUZlR0V0VUdJSjBWaDVNVG95Yk15Y0c3T3Y4UWZwZExHUFdTUC9lN28",
        rating: 4.7
    },
    {
        id: 2,
        name: "Bose QuietComfort Headphones",
        description: "Immersive sound with world-class noise cancellation and all-day comfort.",
        price: 24900,
        image: "https://cdn.shopify.com/s/files/1/0003/7719/2499/files/2.AVStore-Bose-QuietComfort-Wireless-Headphones-Front-Right-Angled-View-Cypress-Green_600x.jpg?v=1709896310",
        rating: 4.6
    },
    {
        id: 3,
        name: "Samsung Galaxy S23 Ultra",
        description: "Epic photography, boundless creativity.",
        price: 83499,
        image: "https://m.media-amazon.com/images/I/51ygk8oviDL._UF894,1000_QL80_.jpg",
        rating: 4.7
    },
    {
        id: 4,
        name: "LG 90″ OLED TV",
        description: "90‑inch OLED TV: perfect home-cinema experience with infinite contrast and vibrant colors.",
        price: 499990,
        originalPrice: 549990,
        image: "https://img-prd-pim.poorvika.com/product/lg-4k-ultra-hd-smart-oled-evo-tv-g4-65-inch-front-view-min.png",
        rating: 4.4
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        description: "Your wrist-worn companion for connectivity, fitness, and convenience.",
        price: 35900,
        image: "https://inventstore.in/wp-content/uploads/2023/09/3-2.webp",
        rating: 4.8
    },
    ],
    fashionProducts: [
    {
        id: 1,
        name: "Levi's Slim Fit Jeans",
        description: "Comfortable mid-rise jeans with a slim fit and stretchable fabric.",
        price: 1999,
        image: "https://assets.ajio.com/medias/sys_master/root/20240903/W3VZ/66d717cd6f60443f314e10fb/-473Wx593H-442429443-indigo-MODEL.jpg",
        rating: 4.6
    },
    {
        id: 2,
        name: "Roadster Casual Shirt",
        description: "Checked casual shirt with full sleeves and button-down collar.",
        price: 899,
        image: "https://rukminim3.flixcart.com/image/850/1000/jxp08sw0/shirt/9/j/h/38-2284633-roadster-original-imafg3g2uxfgrngg.jpeg?q=90&crop=false",
        rating: 4.5
    },
    {
        id: 3,
        name: "H&M Cotton T-Shirt",
        description: "Soft cotton crew-neck t-shirt for everyday casual wear.",
        price: 699,
        image: "https://assets.ajio.com/medias/sys_master/root/20250320/GPuN/67dbc1757a6cd4182f713f52/-473Wx593H-700323309-white-MODEL.jpg",
        rating: 4.4
    },
    {
        id: 4,
        name: "Adidas Running Shoes",
        description: "Lightweight and breathable shoes with cushioned sole for comfort.",
        price: 3499,
        image: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/glbl_re_running_fw24_evergreen_catlp_navigation_card_teaser_benefits_adistar_dmt_3ad2d94b3b.jpg",
        rating: 4.6
    },
    {
        id: 5,
        name: "HRX Training Shorts",
        description: "Moisture-wicking shorts designed for active performance.",
        price: 749,
        image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/26901982/2024/4/17/32ec235a-920a-40c9-8e35-bd781c43dc931713338664488-HRX-by-Hrithik-Roshan-Men-Shorts-1181713338664013-1.jpg",
        rating: 4.3
    },
    ],
    foodProducts: [
    {
        id: 1,
        name: "Kellogg's Cornflakes",
        description: "Crispy, toasted corn flakes fortified with iron and vitamins.",
        price: 299,
        image: "https://m.media-amazon.com/images/I/71pIIw2dLdL.jpg",
        rating: 4.6
    },
    {
        id: 2,
        name: "Maggi Instant Noodles",
        description: "Tasty 2-minute noodles with the classic masala flavor.",
        price: 60,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd4jGqIHX0RAC2inn5zvgERt7jaWSBSQGQ5A&s",
        rating: 4.5
    },
    {
        id: 3,
        name: "Amul Butter",
        description: "Creamy and delicious salted butter for cooking and spreading.",
        price: 235,
        image: "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/7514beed-37f7-4c8c-b50a-4b39842009b8.jpg?ts=1707312315",
        rating: 4.7
    },
    {
        id: 4,
        name: "Tata Sampann Moong Dal",
        description: "Unpolished yellow moong dal rich in protein and fiber.",
        price: 145,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWH87cfvNPFOTCpVaf5sldrUMHY3cZ2J43qA&s",
        rating: 4.6
    },
    {
        id: 5,
        name: "Nestlé Everyday Dairy Whitener",
        description: "Creamy dairy whitener for rich, milky tea and coffee.",
        price: 279,
        image: "https://5.imimg.com/data5/SELLER/Default/2023/5/307338888/NN/JZ/CX/66565206/1-kg-nestle-everyday-milk-powder-500x500.jpg",
        rating: 4.3
    },
    ],
    furnitureProducts: [
    {
        id: 1,
        name: "IKEA LACK Coffee Table",
        description: "Minimalist coffee table with lightweight construction and sleek finish.",
        price: 1999,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVFWHjpiFJ6MgcpcMcnvvJPvcsLBdu83OJA&s",
        rating: 4.3
    },
    {
        id: 2,
        name: "Urban Ladder Carson Study Desk",
        description: "Compact and sturdy study desk with storage shelf and modern design.",
        price: 7499,
        image: "https://www.ulcdn.net/images/products/921494/product/Sidney_Study_Table_Rustik_Oak_LP.jpg?1722319558",
        rating: 4.5
    },
    {
        id: 3,
        name: "Nilkamal Leo Plastic Chair",
        description: "Durable plastic chair for indoor and outdoor use.",
        price: 799,
        image: "https://www.nilkamalfurniture.com/cdn/shop/products/NilkamalCHR2005Chair_MarbleBeige.jpg?v=1669274627&width=1080",
        rating: 4.1
    },
    {
        id: 4,
        name: "Wakefit Memory Foam Mattress",
        description: "Orthopedic memory foam mattress for restful sleep and back support.",
        price: 8999,
        image: "https://ik.imagekit.io/2xkwa8s1i/img/mattresslifestyle/Latexclassic29429/WMFWLM_LS_1.jpg",
        rating: 4.6
    },
    {
        id: 5,
        name: "Pepperfry Solimo Sheesham Wood Bed",
        description: "Queen-size solid wood bed with strong frame and elegant polish.",
        price: 17999,
        image: "https://m.media-amazon.com/images/I/71a75Ps9LML._AC_UF894,1000_QL80_.jpg",
        rating: 4.4
    },
    ],
    kitchenProducts: [
    {
        id: 1,
        name: "Philips Air Fryer HD9252",
        description: "Healthy frying with Rapid Air Technology – fry with up to 90% less fat.",
        price: 9990,
        image: "https://images.philips.com/is/image/philipsconsumer/vrs_acdd8c7f12d8733192e01f7688aec0c2724b05d4?$pnglarge$&wid=1250",
        rating: 4.6
    },
    {
        id: 2,
        name: "Instant Pot Duo 7-in-1",
        description: "Versatile electric pressure cooker that replaces 7 kitchen appliances.",
        price: 10499,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/6/YO/XH/PU/33940976/instant-pot-duo-mini-3l-700w-7in1-multi-use-pressure-cooker-500x500.jpg",
        rating: 4.8
        },
        {
        id: 3,
        name: "Prestige Iris Mixer Grinder",
        description: "Powerful 750W mixer with multiple jars for grinding, blending, and juicing.",
        price: 3899,
        image: "https://m.media-amazon.com/images/I/51HfqyUaHyL.jpg",
        rating: 4.5
        },
        {
        id: 4,
        name: "Kent Grand Plus RO Water Purifier",
        description: "Advanced water purifier with RO+UV+UF+TDS Control and storage tank.",
        price: 15990,
        image: "https://rukminim2.flixcart.com/image/750/900/xif0q/water-purifier/g/j/c/grand-plus-black-ro-water-purifier-111099b-kent-original-imagqbgvy4xkpkfy.jpeg?q=90&crop=false",
        rating: 4.4
        },
        {
        id: 5,
        name: "Bajaj Majesty OTG 25L",
        description: "Multi-functional oven toaster griller for baking, grilling, and toasting.",
        price: 6790,
        image: "https://www.bajajelectricals.com/cdn/shop/files/Banner_5_5860a0f2-ec9b-41a4-9e0d-ad12f203991f.jpg?v=1749189398&width=1214",
        rating: 4.3
        },
    ],
    sportsProducts: [
    {
        id: 1,
        name: "SS Koku Cricket Bat",
        description: "Premium tennis ball cricket bat made from high-grade willow.",
        price: 5999,
        image: "https://5.imimg.com/data5/SELLER/Default/2023/3/296852212/BA/MJ/ST/40983079/ss-gunther-player-edition-cricket-bat-500x500.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "SG Club Edition Cricket Ball (Pack of 6)",
        description: "Red leather-clad cricket balls suitable for club-level matches.",
        price: 1799,
        image: "https://m.media-amazon.com/images/I/71rDiOh5lvL.jpg",
        rating: 4.3
    },
    {
        id: 3,
        name: "Yonex Astrox 88D Badminton Racquet",
        description: "High-performance racquet built for power and control.",
        price: 9999,
        image: "https://racketszone.com/wp-content/uploads/2024/04/AX88yonexphoto_56318d51-acbf-4206-aa48-6639a1654938.webp",
        rating: 4.8
    },
    {
        id: 4,
        name: "Yonex Feather Badminton Shuttlecock (12 pcs)",
        description: "Official-grade feather shuttlecocks for tournament play.",
        price: 2499,
        image: "https://m.media-amazon.com/images/I/71d1-Bx9NHL._UF894,1000_QL80_.jpg",
        rating: 4.6
    },
    {
        id: 5,
        name: "Cosco Ultimate Volleyball",
        description: "Durable rubber volleyball suitable for indoor and outdoor use.",
        price: 899,
        image: "https://gospree.in/wp-content/uploads/2022/12/cosco-spike-volley-4.jpg",
        rating: 4.2
    },
        ],
    childrenToysProducts: [
    {
        id: 1,
        name: "LEGO Classic Creative Bricks",
        description: "Build anything with 500+ colorful LEGO pieces for kids aged 4+.",
        price: 1999,
        image: "https://m.media-amazon.com/images/I/81nZVW8OXQL.jpg",
        rating: 4.8
    },
    {
        id: 2,
        name: "Barbie Dreamhouse Doll Set",
        description: "Barbie’s 3-story dreamhouse with lights, sounds, and accessories.",
        price: 8499,
        image: "https://hmadmin.hamleys.in/product/491232286/665/491232286-2.jpg",
        rating: 4.7
    },
    {
        id: 3,
        name: "Hot Wheels 20-Car Pack",
        description: "Exciting collection of 20 die-cast Hot Wheels cars.",
        price: 1599,
        image: "https://m.media-amazon.com/images/S/aplus-media/vc/d38bade0-ab7d-4b89-813a-58d8504e6594._CR0,0,300,300_PT0_SX300__.jpg",
        rating: 4.6
    },
    {
        id: 4,
        name: "Crayola Super Art Set",
        description: "Inspiring art set with crayons, markers, and paper.",
        price: 799,
        image: "https://images-cdn.ubuy.co.in/6807262bf30e1dc4a404896c-crayola-imagination-art-coloring-set.jpg",
        rating: 4.5
    },
    {
        id: 5,
        name: "Play-Doh Modeling Compound 10-Pack",
        description: "Classic Play-Doh colors for creative fun and learning.",
        price: 499,
        image: "https://images-cdn.ubuy.co.in/63f75253ac2fd655be015be7-play-doh-modeling-compound-50-value.jpg",
        rating: 4.6
    },
    ],

};

let currentCategory = null; // Keep track of the currently shown category

function showProducts(category) {
  const container = document.getElementById('product-container');

  // If same category is clicked again, clear the container and reset
  if (currentCategory === category) {
    container.innerHTML = '';
    currentCategory = null;
    return;
  }

  // Update currentCategory to the new one
  currentCategory = category;

  const products = productData[category];
  container.innerHTML = ''; // Clear existing content

  products.forEach(product => {
    const productCard = `
      <div class="bg-white rounded-xl shadow-md p-4 transition hover:shadow-lg">
        <img src="${product.image}" alt="${product.name}" class="rounded-lg h-40 w-full object-cover mb-2">
        <h3 class="font-semibold text-lg">${product.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${product.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-purple-700 font-bold text-lg">₹${product.price}</span>
          <button class="bg-orange-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-700">Add to Cart</button>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
  });
}

window.showProducts = showProducts;
export default showProducts;
