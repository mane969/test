import React from 'react';
import './HygieneSection.css';

const HygieneSection = () => {
    return (
        <section className="hygiene-section">
            <div className="hygiene-content">
                <h2>Our Commitment to Quality & Hygiene</h2>
                <p>
                    In our kitchen, cleanliness is as important as our ingredients. We adhere to the strictest hygiene standards to ensure that every product is not only delicious but also perfectly safe. From sanitized workstations to daily temperature checks, we are dedicated to providing you with baked goods you can trust.
                </p>
                <div className="standards-list">
                    <div className="standard-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line></svg>
                        <span>Fresh & Natural Ingredients</span>
                    </div>
                    <div className="standard-item">
                        {/* --- TYPO FIXED IN THE SVG BELOW --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>Impeccable Kitchen Standards</span>
                    </div>
                    <div className="standard-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        <span>Daily Safety Checks</span>
                    </div>
                </div>
            </div>
            <div className="hygiene-image">
                <img src="/images/ourKitchen.jpg" alt="A bright, clean, and sanitized commercial kitchen" />
            </div>
        </section>
    );
};

export default HygieneSection;

