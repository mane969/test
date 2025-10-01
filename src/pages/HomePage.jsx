import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import HygieneSection from '../components/HygieneSection';
import CommunitySection from '../components/CommunitySection';
import './HomePage.css';

const HomePage = ({ onProductSelect }) => {
    // The content is now wrapped in a single div to match the other pages' structure.
    return (
        <div className="page-content-wrapper">
            <Hero />
            <WhyChooseUs />
            <div className="main-content">
                <FeaturedProducts onProductSelect={onProductSelect} />
            </div>
            <HygieneSection />
            <CommunitySection />
        </div>
    );
};

export default HomePage;