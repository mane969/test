import React from 'react';
import './ProductCard.css';

// The onCardClick prop is essential for opening the modal
const ProductCard = ({ product, onCardClick }) => {

    // This function calls the handler passed down from App.jsx
    const handleClick = () => {
        onCardClick(product);
    };

    // --- UPDATED LOGIC ---
    // 1. Check if product_images exists and is not an empty array.
    // 2. If it is, use the first image.
    // 3. If not, use a placeholder image URL to avoid crashing.
    const imageUrl = product.product_images && product.product_images.length > 0
        ? product.product_images[0]
        : 'https://via.placeholder.com/300?text=No+Image';

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="product-card-image-wrapper">
                {/* Use the new 'imageUrl' variable which is always safe */}
                <img src={imageUrl} alt={product.name} className="product-card-image" />
            </div>
            <div className="product-card-info">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">₹{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;