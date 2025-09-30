// HomePage.js
import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import GeometricBackground from '../components/GeometricBackground';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-wrapper">
            {/* Background */}
            <GeometricBackground />

            {/* Content */}
            <Hero />

            {/* Wrap Why Us in its own solid container */}
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
