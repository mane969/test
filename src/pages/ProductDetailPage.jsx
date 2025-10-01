import React, { useState, useEffect } from 'react';
import './ProductDetailPage.css';

// This component is now a Modal
const ProductDetailPage = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false);

    // Effect to trigger the animation on mount
    useEffect(() => {
        // A tiny delay allows the component to be in the DOM before the animation class is added
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for the closing animation to finish before calling onClose
        setTimeout(onClose, 400);
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    if (!product) {
        return null;
    }

    return (
        <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
            <div className={`modal-content ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
                
                <button className="modal-close-button" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="modal-body">
                    <div className="modal-image-area">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="modal-product-image"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/450x450/C68C4A/FFF?text=Image+Unavailable"; }}
                        />
                    </div>

                    <div className="modal-info-area">
                        <h1 className="modal-product-name">{product.name}</h1>
                        <p className="modal-product-price">{product.price}</p>
                        
                        <p className="modal-product-description">{product.description}</p>
                        
                        <div className="modal-tags">
                            {product.tags && product.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>

                        <div className="quantity-selector">
                            <h3 className="quantity-title">Quantity</h3>
                            <div className="quantity-controls">
                                <button onClick={decrementQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                        </div>

                        <button className="add-to-cart-button">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;