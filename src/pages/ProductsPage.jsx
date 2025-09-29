import React from 'react';
import { productsData } from '../data/products'; // Import data
import ProductCard from '../components/ProductCard'; // Import the card component
import './ProductsPage.css'; // Import the new CSS file

const ProductsPage = () => {
    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Full Menu</h1>
            <div className="products-page-grid">
                {productsData.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;