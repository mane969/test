import React from 'react';
import { productsData } from '../data/products'; // Assuming your product data is here
import ProductCard from './ProductCard';
import './FeaturedProducts.css';

// It receives the onProductSelect handler from HomePage
const FeaturedProducts = ({ onProductSelect }) => {
    // Get the first 3 products to feature
    const featured = productsData.slice(0, 3);

    return (
        <section className="featured-products-section">
            <h2 className="featured-products-title">Our Featured Treats</h2>
            <div className="featured-products-grid">
                {featured.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        // Pass the handler to each card
                        onCardClick={onProductSelect}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;