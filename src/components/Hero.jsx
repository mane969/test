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
                    <Link to="/products" className="btn-primary">Order Now</Link>
                    <Link to="/products" className="btn-secondary">Explore Menu</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;