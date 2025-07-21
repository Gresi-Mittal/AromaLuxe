import React from 'react';
import '../styles.css';
import ProductCard from '../components/ProductCard';
import InfoSection from '../components/InfoSection';

const Products = () => {
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
      name: "Versace Woman by Versace 3.4 oz Eau de Parfum Spray / Women",
      price: "₹3,499",
      image: "/images/shopping (14).webp",
      size: "100 ML"
    },
    {
      name: "Afnan Supremacy Not Only Intense Extrait De Parfum for Men",
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
    }
  ];

  return (
    <div className="products-page">
      <div className="product-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      
      <InfoSection />
    </div>
  );
};

export default Products;