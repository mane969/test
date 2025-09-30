import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    return (
        <section className="why-us-section">
            <h2 className="why-us-title">Why Delicia?</h2>
            <p className="why-us-subtitle">Baking with passion, purpose, and the finest ingredients.</p>
            <div className="features-container">
                <div className="feature-item">
                    <div className="feature-icon">
                        {/* Leaf Icon for Natural Ingredients */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                    </div>
                    <h3 className="feature-title">All-Natural Ingredients</h3>
                    <p className="feature-description">
                        We use only the freshest, locally-sourced ingredients. No preservatives, no processed sugars, just pure, wholesome goodness.
                    </p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">
                        {/* Heart Icon for Healthy */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </div>
                    <h3 className="feature-title">Healthy & Wholesome</h3>
                    <p className="feature-description">
                        Our recipes are crafted to be as nutritious as they are delicious, offering a range of options that cater to a healthy lifestyle.
                    </p>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">
                         {/* Sun Icon for Freshness */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </div>
                    <h3 className="feature-title">Baked Fresh Daily</h3>
                    <p className="feature-description">
                        Every item is baked from scratch in our Pune kitchen each morning to ensure it gets to you at the peak of its flavor and freshness.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;