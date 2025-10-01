import React from 'react';
// --- All these paths are now corrected ---
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import HygieneSection from '../components/HygieneSection';
import CommunitySection from '../components/CommunitySection';
import './HomePage.css';

// The component now accepts the onProductSelect handler from App.jsx
const HomePage = ({ onProductSelect }) => {
    return (
        <div>
            <Hero />
            <WhyChooseUs />
            <div className="main-content">
                {/* Pass the handler down to the FeaturedProducts component */}
                <FeaturedProducts onProductSelect={onProductSelect} />
            </div>
            <HygieneSection />
            <CommunitySection />
        </div>
    );
};

export default HomePage;

