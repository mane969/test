import React, { useState } from 'react';
import { productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailPage from './ProductDetailPage'; // This is now the modal
import './ProductsPage.css';

const ProductsPage = () => {
    // State to manage which product is selected to be shown in the modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Handler to open the modal with the clicked product's data
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    // Handler to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Full Menu</h1>
            <div className="products-page-grid">
                {productsData.map(product => (
                    // Pass the click handler to each product card
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onCardClick={handleProductClick} 
                    />
                ))}
            </div>

            {/* Conditionally render the modal when a product is selected */}
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