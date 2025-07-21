import React from 'react';
import '../styles.css';
import ProductCard from '../components/ProductCard';
import InfoSection from '../components/InfoSection';


const HimPerfume = () => {
  const products = [
    {
      name: "Afnan Supremacy De Parfum for Men",
      price: "₹4795",
      image: "/images/shopping (16).webp",
      size: "100ML"
    },
    {
      name: "The Man Company Black Edt Perfume For Men - 100 ml",
      price: "₹999",
      image: "/images/shopping (17).webp",
      size: "100ML"
    },
    {
      name: "Rasasi Hawas Ice Edp 100ml for Men",
      price: "₹3,999",
      image: "/images/shopping (18).webp",
      size: "100ML"
    },
    {
      name: "Rasasi Shuhrah EDP for Men, 90 ml",
      price: "₹2,199",
      image: "/images/shopping (19).webp",
      size: "90ML"
    },
    {
      name: "Bella Vita Luxury Ceo Man Perfume 100 ml",
      price: "₹999",
      image: "/images/shopping (20).webp",
      size: "100ML"
    },
    {
      name: "Tom Ford Oud Wood Eau De Parfum",
      price: "₹27,999",
      image: "/images/shopping (21).webp",
      size: "100ML"
    },
    {
      name: "Rasasi Eau De Parfum for men | Long Lasting Perfume",
      price: "₹1,999",
      image: "/images/shopping (22).webp",
      size: "100ML"
    },
    {
      name: "Ajmal Kyros Eau De Parfum 100ml for Men",
      price: "₹999",
      image: "/images/shopping (23).webp",
      size: "100ML"
    },
    {
      name: "Versace Pour Homme EDT 5ML for Men",
      price: "₹1,999",
      image: "/images/shopping (26).webp",
      size: "5ML"
    },
    {
      name: "Burberry Touch For Men Eau de Toilette (100 ml)",
      price: "₹2,999",
      image: "/images/shopping (25).webp",
      size: "100ML"
    }
  ];

  return (
    <div className="him-perfume-page">
      <div className="ban">
        <img src="/images/banner-21.jpg" alt="Perfume Bottles" />
      </div>
      
      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      
      <InfoSection />
    </div>
  );
};

export default HimPerfume;