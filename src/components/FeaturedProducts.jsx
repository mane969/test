import React from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../data/products'; // 1. Import from the new data file
import './FeaturedProducts.css';

// 2. We can now delete the old `featuredProductsData` array from this file.

const FeaturedProducts = () => {
    // We can slice the array to only show the first 3 items as "featured"
    const featured = productsData.slice(0, 3);

    return (
        <section className="featured-products-section">
            <h2 className="section-title">Our Featured Treats</h2>
            <div className="products-grid">
                {featured.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;