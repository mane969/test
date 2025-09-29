import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

const HomePage = () => {
    return (
        <div>
            <Hero />
            {/* This div will center the sections below the hero */}
            <div className="main-content">
                <FeaturedProducts />
                {/* Other centered sections can go here */}
            </div>
        </div>
    );
};

export default HomePage;