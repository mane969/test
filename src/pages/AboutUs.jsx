import React, { useState, useEffect } from 'react';
import './AboutUs.css';

// Array of your kitchen images for the slideshow
const kitchenImages = [
    '/images/ourKitchen.jpg',
    '/images/ourKitchen2.png'
];

const AboutUs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // This effect will run on a timer to change the slide
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % kitchenImages.length);
        }, 4000); // Change image every 4 seconds

        // Clean up the interval when the component is unmounted
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="about-us-wrapper">
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
                            Delicia was born not in a boardroom, but in a small home kitchen right here in Pune, surrounded by the aroma of cardamom, cinnamon, and freshly baked bread. It started with a simple passion: to recreate the authentic, wholesome flavors of traditional baking for our friends and family. We believe that the best ingredients are simple, natural, and locally sourced whenever possible.
                        </p>
                        <p>
                            Our philosophy is to bake with purpose. We pour our hearts into every recipe, ensuring that each bite is not just delicious, but also nourishing. From our hand-kneaded sourdough to our delicate pastries, we are dedicated to a craft that feels both timeless and personal.
                        </p>
                    </div>
                </section>

                <section className="baker-section">
                    <div className="baker-content">
                        <h2>Meet the Baker</h2>
                        <h3>Aisha Khan</h3>
                        <p>
                            For me, baking is more than a profession—it's a way of life. I learned the art of baking from my grandmother, who taught me that patience, passion, and the finest ingredients are the secrets to unforgettable food. After years of perfecting my craft and sharing my creations with the local community in Pune, I founded Delicia to bring that same joy to a wider audience. My dream is to make Delicia a place where every customer feels like family.
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

