import React from 'react';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

// The component now accepts the onProductSelect handler as a prop
const ProductsPage = ({ onProductSelect }) => {
    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Full Menu</h1>
            <div className="products-page-grid">
                {productsData.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        // Pass the handler to each card
                        onCardClick={onProductSelect}
                    />
                ))}
            </div>
            {/* The modal is no longer rendered here */}
        </div>
    );
};

export default ProductsPage;