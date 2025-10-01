import React from 'react';
// We no longer need Link here, as we are not navigating to a new page
import './ProductCard.css';

// The component now accepts an `onCardClick` prop
const ProductCard = ({ product, onCardClick }) => {
    return (
        // Changed from a Link to a div with an onClick event
        <div className="product-card" onClick={() => onCardClick(product)}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
        </div>
    );
};

export default ProductCard;