import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './ProductDetailPage.css';
import NotificationModal from '../components/NotificationModal';

const ProductDetailPage = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 600);
    };

    const handleAddToCart = () => {
        // In a real app, this is where you would dispatch an action to add the item to a global cart state.
        console.log(`${quantity} x ${product.name} added to cart!`);
        setShowNotification(true);
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    if (!product) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
                <div className={`modal-content ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close-button" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="modal-body">
                        <div className="modal-image-area">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="modal-product-image"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/C68C4A/FFF?text=Image+Unavailable"; }}
                            />
                            <div className="satisfaction-guarantee">
                                <span className="heart-icon">💖</span>
                                Hope this makes your day!
                            </div>
                        </div>
                        <div className="modal-info-area">
                            <h1 className="modal-product-name">{product.name}</h1>
                            <p className="modal-product-tagline">{product.tagline || 'A delightful treat for your senses.'}</p>
                            <p className="modal-product-price">{product.price}</p>
                            <p className="modal-product-description">{product.description}</p>
                            {product.ingredients && (
                                <div className="modal-ingredients">
                                    <h3>Finest Ingredients:</h3>
                                    <p>{product.ingredients}</p>
                                </div>
                            )}
                            <div className="modal-tags">
                                {product.tags && product.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="purchase-controls">
                                <div className="quantity-selector">
                                    <button onClick={decrementQuantity} aria-label="Decrease quantity">-</button>
                                    <span>{quantity}</span>
                                    <button onClick={incrementQuantity} aria-label="Increase quantity">+</button>
                                </div>
                                <button onClick={handleAddToCart} className="add-to-cart-button">
                                    Add to Your Box
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <NotificationModal 
                product={product} 
                quantity={quantity}
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </>,
        document.body
    );
};

export default ProductDetailPage;