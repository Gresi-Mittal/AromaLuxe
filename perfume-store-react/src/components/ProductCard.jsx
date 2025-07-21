import React from 'react';
import '../styles.css';
import { addToCart } from '../utils';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3 title={product.name}>{product.name}</h3>
      <p className="price">{product.price}</p>
      {product.size && <p className="size">{product.size}</p>}
      <div className="btn-container">
        <button className="btn cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;