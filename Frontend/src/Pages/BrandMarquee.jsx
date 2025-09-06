import React, { useState } from 'react';
import "../Styles/BrandMarquee.css";

const clothingBrands = [
  {
    name: 'Nike',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxWjbiOX8rYuq720FgrIefCPVC-y-gHSUYg&s',
    url: 'https://www.nike.com',
  },
  {
    name: 'Zara',
    logo: 'https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design.jpg',
    url: 'https://www.zara.com',
  },
  {
    name: 'Puma',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg',
    url: 'https://www.puma.com',
  },
  {
    name: 'Adidas',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9h0lpUGrbfYgjqxOB-lqQyMbquztbOV0nVg&s',
    url: 'https://www.adidas.com',
  },
  {
    name: 'Levis',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMRKrvSy9e5u3U1ODXaRNGfeSGzL43-igpA&s',
    url: 'https://www.levis.com',
  },
  {
    name: 'American Eagle',
    logo: 'https://1000logos.net/wp-content/uploads/2020/05/Logo1-American-Eagle.jpg',
    url: 'https://www.ae.com',
  },
  {
    name: 'Gucci',
    logo: 'https://wallpapers.com/images/hd/gucci-golden-logo-black-background-4425e92efifss0xb.png',
    url: 'https://www.gucci.com',
  },
  {
    name: 'Peter England',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVbfasNqhAXTW0YIr5M8fRMYCZZd98w7OsZA&s',
    url: 'https://www.peterengland.com',
  },
  {
    name: 'Burberry',
    logo: 'https://i.pinimg.com/736x/88/ed/4b/88ed4b169f0a6661e09709850a2a86d0.jpg',
    url: 'https://www.burberry.com',
  },
];

const BrandMarquee = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const handleClick = (brand) => {
    setToastText(`🚀 Redirecting to ${brand.name}...`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      window.open(brand.url, '_blank');
    }, 1000); // Increased duration to fully display toast
  };

  return (
    <div className="bg-gray-100 px-4 py-10 font-inter">
      

      <div className="brand-marquee-container">
        {showToast && <div className="custom-toast">{toastText}</div>}

        <div className="brand-marquee-row">
          <div className="brand-marquee-track">
            {clothingBrands.concat(clothingBrands).map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
                onClick={() => handleClick(brand)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
