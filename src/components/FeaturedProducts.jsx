import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './FeaturedProducts.css';
// We no longer import the static data file

const FeaturedProducts = ({ onProductSelect }) => {
    // --- NEW: State to hold products fetched from the server ---
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- NEW: useEffect hook to fetch data when the component loads ---
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch featured products. Is your server running?');
                }
                const allProducts = await response.json();
                // Get the first 3 products from the fetched data
                setFeatured(allProducts.slice(0, 3));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []); // The empty array ensures this runs only once

    // --- RENDER STATES ---
    if (loading) {
        return (
            <section className="featured-products-section">
                <h2 className="featured-products-title">Our Featured Treats</h2>
                <p className="loading-message">Loading treats...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="featured-products-section">
                <h2 className="featured-products-title">Our Featured Treats</h2>
                <p className="error-message">Could not load featured treats.</p>
            </section>
        );
    }

    return (
        <section className="featured-products-section">
            <h2 className="featured-products-title">Our Featured Treats</h2>
            <div className="featured-products-grid">
                {/* This now maps over the 'featured' state variable */}
                {featured.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onCardClick={onProductSelect}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;