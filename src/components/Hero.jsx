import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <img src="/images/logo.png" alt="Delicia Bakery Logo" className="hero-logo" />
                <h1 className="hero-title">
                    Welcome to <span className="highlight">Delicia</span>
                </h1>
                <p className="hero-subtitle">
                    Freshly baked <span>cakes</span>, <span>pies</span> &amp; <span>pastries</span>,
                    crafted with love <span className="heart-icon">💖</span> — just for you.
                </p>
                <div className="hero-buttons">
                    <Link to="/products" className="btn-primary">
                        <span>Order Now</span>
                        {/* --- ADD THIS ICON --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;