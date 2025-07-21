import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import InfoSection from '../components/InfoSection';

const Home = () => {
  const bannerRef = useRef(null); // auto banner slider
  const productSliderRef = useRef(null); // trending products
  const testimonialsRef = useRef(null); // testimonials

  // ✅ Infinite Auto Slider for banners
  useEffect(() => {
    const container = bannerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    let resetScroll = false;

    const interval = setInterval(() => {
      if (!container) return;

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      if (container.scrollLeft + scrollAmount >= container.scrollWidth - container.offsetWidth) {
        resetScroll = true;
      }
    }, 3000);

    const handleScroll = () => {
      if (resetScroll) {
        container.scrollTo({ left: 0, behavior: 'auto' });
        resetScroll = false;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollSlider = (direction) => {
    const scrollAmount = 300;
    productSliderRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const scrollTestimonials = (direction) => {
    const scrollAmount = 300;
    testimonialsRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const trendingProducts = [
    {
      name: "Cantabil Desire Long Lasting Eau De Toilette - 100ml",
      price: "₹499",
      image: "/images/shopping (1).webp",
    },
    {
      name: "Bella Vita Luxury Date EDP Perfume for Women 100 ML",
      price: "₹499",
      image: "/images/shopping (3).webp",
    },
    {
      name: "Park Avenue Euphoria Eau De Parfum - 100 Ml",
      price: "₹299",
      image: "/images/shopping (2).webp",
    },
    {
      name: "Adilqadri The Story Perfume For Men & Women | French Scent | Long Lasting Extrait De Parfum - 100 ml",
      price: "₹1,299",
      image: "/images/shopping (4).webp",
    },
    {
      name: "Park Avenue Harmony Eau De Parfum - 100 Ml",
      price: "₹399",
      image: "/images/shopping (5).webp",
    },
    {
      name: "Most Wanted Perfume For Men",
      price: "₹399",
      image: "/images/shopping (6).webp",
    },
  ];

  const testimonials = [
    {
      date: "12/10/24",
      name: "Sangita L.",
      rating: "★★★★★",
      title: "Overall great experience shopping",
      review: "Overall great experience shopping",
    },
    {
      date: "02/2/25",
      name: "Supriya N.",
      rating: "★★★★★",
      title: "Great shopping experience!",
      review: "Great shopping experience!",
    },
    {
      date: "01/28/25",
      name: "Annie P.",
      rating: "★★★★★",
      title: "Shipping & service were prompt",
      review: "Shipping & service were prompt",
    },
    {
      date: "01/18/25",
      name: "Divya.",
      rating: "★★★★★",
      title: "Nice Fragrance",
      review: "Nice Fragrance",
    },
  ];

  return (
    <div className="home-page">
      {/* ✅ Auto Image Slider */}
      <div className="auto-slider">
        <div className="slider-track" ref={bannerRef}>
          <img src="/images/Banner_1920x.webp" alt="Banner 1" />
          <img src="/images/568bba204abda_thumb900.webp" alt="Banner 2" />
          <img src="/images/568ee48e87fd6_thumb900.webp" alt="Banner 3" />
          {/* Duplicated for infinite scroll illusion */}
          <img src="/images/Banner_1920x.webp" alt="Banner 1 Duplicate" />
          <img src="/images/568bba204abda_thumb900.webp" alt="Banner 2 Duplicate" />
          <img src="/images/568ee48e87fd6_thumb900.webp" alt="Banner 3 Duplicate" />
        </div>
      </div>

      {/* Category Boxes */}
      <div className="container">
        <div className="image-box">
          <Link to="/her-perfume">
            <img src="/images/women-perfume.webp" alt="For Her" />
            <div className="text-overlay">FOR HER</div>
          </Link>
        </div>

        <div className="image-box">
          <Link to="/him-perfume">
            <img src="/images/men-perfume.webp" alt="For Him" />
            <div className="text-overlay">FOR HIM</div>
          </Link>
        </div>
      </div>

      {/* Trending Products */}
      <div className="trending-section">
        <h2>Trending Products</h2>
        <div className="product-slider">
          <button className="arrow left-arrow" onClick={() => scrollSlider(-1)}>
            &#10094;
          </button>

          <div className="slider-container" ref={productSliderRef}>
            {trendingProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <button className="arrow right-arrow" onClick={() => scrollSlider(1)}>
            &#10095;
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>TESTIMONIALS</h2>
        <div className="testimonials-slider">
          <button className="arrow left-arrow" onClick={() => scrollTestimonials(-1)}>
            &#10094;
          </button>

          <div className="slider-container" ref={testimonialsRef}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span>{testimonial.date}</span>
                  <span className="verified">✔ Verified Buyer</span>
                </div>
                <h3>{testimonial.name}</h3>
                <div className="stars">{testimonial.rating}</div>
                <p>
                  <strong>{testimonial.title}</strong>
                </p>
                <p>{testimonial.review}</p>
              </div>
            ))}
          </div>

          <button className="arrow right-arrow" onClick={() => scrollTestimonials(1)}>
            &#10095;
          </button>
        </div>
      </div>

      <InfoSection />
    </div>
  );
};

export default Home;
