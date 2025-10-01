import React, { useState, useEffect } from 'react';
import './AboutUs.css';

// The GeometricBackground import has been removed.

const kitchenImages = [
    '/images/ourKitchen.jpg',
    '/images/ourKitchen2.png'
];

const AboutUs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % kitchenImages.length);
        }, 4000);

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="about-us-wrapper">
            {/* The GeometricBackground component has been removed from here */}
            <div className="about-us-container">
                <header className="about-us-header">
                    <h1>Our Story</h1>
                    <p className="subtitle">From a Pune Kitchen with Love</p>
                </header>

                <section className="story-section">
                    <div className="story-image-slider">
                        {kitchenImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`Delicia's kitchen view ${index + 1}`}
                                className={`slide ${index === currentSlide ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    <div className="story-content">
                        <h2>Baking with Heart and Heritage</h2>
                        <p>
                            Delicia was born not in a boardroom, but in a small home kitchen right here in Pune, surrounded by the aroma of cardamom, cinnamon, and freshly baked bread...
                        </p>
                        <p>
                            Our philosophy is to bake with purpose...
                        </p>
                    </div>
                </section>

                <section className="baker-section">
                    <div className="baker-content">
                        <h2>Meet the Baker</h2>
                        <h3>Aisha Khan</h3>
                        <p>
                            For me, baking is more than a profession—it's a way of life...
                        </p>
                    </div>
                    <div className="baker-image">
                        <img
                            src="/images/aishaKhan.png"
                            alt="Aisha Khan, the baker of Delicia"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;