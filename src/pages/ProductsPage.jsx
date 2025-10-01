import React, { useState } from 'react';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailPage from './ProductDetailPage';
import './ProductsPage.css';

const ProductsPage = () => {
    // State to keep track of the selected product for the modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Function to open the modal with the clicked product's data
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Full Menu</h1>
            <div className="products-page-grid">
                {productsData.map(product => (
                    // Each card is given the function to call when it's clicked
                    <ProductCard
                        key={product.id}
                        product={product}
                        onCardClick={handleProductClick}
                    />
                ))}
            </div>

            {/* This will render the modal only when a product has been selected */}
            {selectedProduct && (
                <ProductDetailPage
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ProductsPage;