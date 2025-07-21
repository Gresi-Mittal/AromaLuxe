import React from 'react';
import '../styles.css';
import ProductCard from '../components/ProductCard';
import InfoSection from '../components/InfoSection';

const HerPerfume = () => {
  const products = [
    {
      name: "RENEE Eau De Parfum Bloom 50ml | Premium Long Lasting Luxury Pe",
      price: "₹295",
      image: "/images/shopping (7).webp",
      size: "15ML"
    },
    {
      name: "Carolina Herrera Good Girl Blush Eau de Parfum - 7 ml",
      price: "₹1980",
      image: "/images/shopping (8).webp",
      size: "7ML"
    },
    {
      name: "Bella Vita Luxury Ceo Woman Eau De Parfum - 100 ml",
      price: "₹499",
      image: "/images/shopping (9).webp",
      size: "100 ML"
    },
    {
      name: "Calvin Klein Euphoria For Women Eau De Parfum",
      price: "₹3,995",
      image: "/images/shopping (10).webp",
      size: "100 ML"
    },
    {
      name: "Bella Vita Organic Glam Perfume 100 Ml",
      price: "₹499",
      image: "/images/shopping (11).webp",
      size: "100 ML"
    },
    {
      name: "Calvin Klein Eternity Eau De Perfume For Women 100ml",
      price: "₹5,499",
      image: "/images/shopping (15).webp",
      size: "100 ML"
    },
    {
      name: "Bellavita Senorita Perfume for Women (100ml)",
      price: "₹499",
      image: "/images/shopping (12).webp",
      size: "100 ML"
    },
    {
      name: "Versace Woman by Versace Spray",
      price: "₹3,499",
      image: "/images/shopping (14).webp",
      size: "100 ML"
    },
    {
      name: "Burberry Weekend for Women Eau de Parfum (100 ml)",
      price: "₹3,999",
      image: "/images/shopping (27).webp",
      size: "100 ML"
    },
    {
      name: "Dior Addict Eau De Parfum 50 ml",
      price: "₹2,999",
      image: "/images/shopping (28).webp",
      size: "50 ML"
    }
  ];

  return (
    <div className="her-perfume-page">
      <div className="b">
        <img src="/images/360_F_292087658_DcjJQHybeo1WYSnnw8dYd0BQnUbvpcDt.jpg" alt="Perfume Bottles" />
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

export default HerPerfume;