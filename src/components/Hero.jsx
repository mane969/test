import React from 'react';
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
                    crafted with love — just for you.
                </p>
                <div className="hero-buttons">
                    <button className="btn-primary">Order Now</button>
                    <button className="btn-secondary">Explore Menu</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
