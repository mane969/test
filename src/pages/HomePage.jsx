import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import HygieneSection from '../components/HygieneSection';
import CommunitySection from '../components/CommunitySection';
import './HomePage.css';

const HomePage = () => {
    return (
        // The homepage only needs to contain its sections. 
        // The background is handled by App.jsx now.
        <div>
            <Hero />
            <WhyChooseUs />
            <div className="main-content">
                <FeaturedProducts />
            </div>
            <HygieneSection />
            <CommunitySection />
        </div>
    );
};

export default HomePage;

