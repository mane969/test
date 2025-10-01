import React from 'react';
import { Link } from 'react-router-dom';
import './CommunitySection.css';

const CommunitySection = () => {
    return (
        <section className="community-section">
            <div className="community-container">
                <div className="community-image-wrapper">
                    <img
                        src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1887&auto=format&fit=crop"
                        alt="A beautifully baked loaf of artisan bread, representing the quality of Delicia's products"
                        className="community-image"
                    />
                </div>
                <div className="community-content">
                    <h2 className="community-title">Rooted in Pune. Crafted with Pride.</h2>
                    <p className="community-subtitle">A Taste of Our City in Every Bite.</p>
                    <p className="community-description">
                        Delicia is a celebration of Pune's vibrant spirit. We believe the most extraordinary flavors are born from our own soil, which is why we partner with local farmers and artisans who share our passion for quality. From the grain to the garnish, every ingredient tells a story of our community. This isn't just baking; it's our love letter to Pune.
                    </p>
                    <Link to="/about" className="community-button">
                        Learn Our Story
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;

