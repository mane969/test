import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';
import { productsData } from '../data/products';

const initialCartItems = [
    { id: 2, quantity: 2 },
    { id: 6, quantity: 1 },
];

const FREE_DELIVERY_THRESHOLD = 3000;

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [isGift, setIsGift] = useState(false);
    const [giftMessage, setGiftMessage] = useState('');

    useEffect(() => {
        const hydratedCart = initialCartItems.map(item => {
            const product = productsData.find(p => p.id === item.id);
            const priceNumber = parseFloat(product.price.replace('₹', '').replace(/,/g, ''));
            return { ...product, quantity: item.quantity, priceNumber, isRemoving: false };
        });
        setCart(hydratedCart);
    }, []);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(productId);
            return;
        }
        setCart(cart.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const handleRemoveItem = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, isRemoving: true } : item
        ));
        setTimeout(() => {
            setCart(prevCart => prevCart.filter(item => item.id !== productId));
        }, 500);
    };

    const subtotal = cart.reduce((total, item) => total + item.priceNumber * item.quantity, 0);
    const taxes = subtotal * 0.18;
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 50;
    const grandTotal = subtotal + taxes + deliveryFee;
    const amountForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;
    const deliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

    if (cart.length === 0) {
        return (
            <div className="main-content empty-cart-container">
                <div className="empty-cart-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </div>
                <h1 className="empty-cart-title">Your Box of Treats is Empty</h1>
                <p className="empty-cart-subtitle">The best memories (and flavors) are waiting to be made. Let's find your next favorite.</p>
                <Link to="/products" className="btn-primary-cart">Discover Our Menu</Link>
            </div>
        );
    }

    return (
        <div className="main-content cart-page-container">
            {/* --- THIS IS THE NEWLY ADDED PART --- */}
            <div className="cart-bg-shape cart-bg-shape-1"></div>
            <div className="cart-bg-shape cart-bg-shape-2"></div>

            <div className="cart-items-section">
                <h1 className="cart-page-title">Your Curated Box</h1>
                <div className="cart-items-list">
                    {cart.map(item => (
                        <div key={item.id} className={`cart-item-card ${item.isRemoving ? 'removing' : ''}`}>
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2 className="cart-item-name">{item.name}</h2>
                                <p className="cart-item-tagline">{item.tagline}</p>
                                <div className="quantity-selector-cart">
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="cart-item-price-section">
                                <p key={item.quantity} className="cart-item-total-price">
                                    ₹{(item.priceNumber * item.quantity).toLocaleString('en-IN')}
                                </p>
                                <button onClick={() => handleRemoveItem(item.id)} className="cart-item-remove">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-summary-section">
                <h2 className="summary-title">Order Summary</h2>
                
                <div className="delivery-progress-container">
                    {amountForFreeDelivery > 0 ? (
                        <p>You're just <strong>₹{amountForFreeDelivery.toLocaleString('en-IN')}</strong> away from free delivery!</p>
                    ) : (
                        <p className="congrats-delivery">🎉 Congratulations! You've unlocked free delivery!</p>
                    )}
                    <div className="progress-bar-background">
                        <div className="progress-bar-foreground" style={{ width: `${deliveryProgress}%` }}></div>
                    </div>
                </div>

                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                    <span>Taxes & Charges</span>
                    <span>₹{taxes.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                 <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="summary-total">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                 <div className="delivery-estimate">
                    <p>🚚 Estimated Delivery: <strong>Today, 5 PM - 7 PM</strong></p>
                </div>
                
                <div className="gift-option">
                    <input type="checkbox" id="isGift" checked={isGift} onChange={() => setIsGift(!isGift)} />
                    <label htmlFor="isGift">Is this a gift? Add a message.</label>
                </div>
                
                {isGift && (
                    <textarea 
                        className="gift-message-box"
                        placeholder="e.g., Happy Birthday, Sanika!"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                    />
                )}

                <button className="checkout-button">
                    <span>Proceed to Checkout</span>
                </button>
            </div>
        </div>
    );
};

export default CartPage;