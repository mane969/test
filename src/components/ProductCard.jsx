import React from 'react';
import './ProductCard.css';

// The onCardClick prop is essential for opening the modal
const ProductCard = ({ product, onCardClick }) => {

    // This function calls the handler passed down from App.jsx
    const handleClick = () => {
        onCardClick(product);
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-card-image-wrapper">
                <img src={product.imageUrl} alt={product.name} className="product-card-image" />
            </div>
            <div className="product-card-info">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
