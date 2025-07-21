import React from 'react';
import '../styles.css';
import InfoSection from '../components/InfoSection';

const About = () => {
  return (
    <div className="about-page">
      <div className="banner">
        <img src="/images/37ae2d3ef1e632b484940a915bee9302.jpg" alt="Perfume Ad" />
      </div>
      
      <div className="box">
        <div className="text-section">
          <h1>AromaLuxe IS SENSUALITY IN A BOTTLE</h1>
          <p>
            It is sensuality in a bottle. It needs no words to describe it. 
            It elevates your everyday to the extraordinary. These are just a few 
            of the things that make AromaLuxe one of the finest French fragrances. 
            Made by celebrated perfumers in France, the range is crafted to last longer. 
            The collection brings to you an assortment of scents, including woody, spicy, 
            citrusy, floral, musky, and fruity fragrances. Worn every day, they transform 
            from being just an accessory to becoming a part of you.
          </p>
        </div>
        <div className="image-section">
          <img src="/images/360_F_141568139_JJHYz2EJphqB19O7rf7uN6wO9L2s4lqE.jpg" alt="Perfume" />
        </div>
      </div>
      
      <InfoSection />
    </div>
  );
};

export default About;