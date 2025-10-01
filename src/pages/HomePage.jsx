// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
// NO LONGER NEEDED: import GeometricBackground from '../components/GeometricBackground';
import './HomePage.css';

const HomePage = () => {
    return (
        // The wrapper div is no longer needed for the background
        <div>
            {/* Content is now the only thing in this file */}
            <Hero />

            <div className="why-us-wrapper">
                <WhyChooseUs />
            </div>

            <div className="main-content">
                <FeaturedProducts />
            </div>
        </div>
    );
};

export default HomePage;