import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content">
                {/* Update the heading here */}
                <h1>Welcome to Delicia</h1>
                <p>Freshly baked goods, made with love, just for you.</p>
                <Link to="/products">
                    <button className="hero-button">View Our Products</button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;