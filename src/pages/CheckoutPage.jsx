// src/pages/CheckoutPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import BakeryLoader from '../components/BakeryLoader';

const FREE_DELIVERY_THRESHOLD = 3000;

const CheckoutPage = ({ cartItems = [], setCartItems }) => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [completedSteps, setCompletedSteps] = useState({ 1: false, 2: false });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        if (paymentMethod === 'upi') {
            setTimeLeft(300); // Reset to 5 minutes
        }
    }, [paymentMethod]);

    useEffect(() => {
        if (timeLeft === 0 || paymentMethod !== 'upi') return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, paymentMethod]);

    const getPriceNumber = (price) => parseFloat(String(price).replace('₹', '').replace(/,/g, ''));
    const subtotal = cartItems.reduce((total, item) => total + getPriceNumber(item.price) * item.quantity, 0);
    const taxes = subtotal * 0.18;

    const standardDeliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 50;
    const expressDeliveryFee = 100;
    const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(standardDeliveryFee);

    useEffect(() => {
        setSelectedDeliveryFee(standardDeliveryFee);
    }, [standardDeliveryFee]);

    const grandTotal = subtotal + taxes + selectedDeliveryFee;

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [cartItems, navigate, isSuccess]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateStep1 = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = "First name is required";
        if (!formData.lastName) errors.lastName = "Last name is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.address) errors.address = "Address is required";
        if (!formData.city) errors.city = "City is required";
        if (!formData.pincode) {
            errors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            errors.pincode = "Pincode must be 6 digits";
        }
        return errors;
    };

    const handleNextStep = (step) => {
        if (activeStep === 1) {
            const errors = validateStep1();
            setFormErrors(errors);
            if (Object.keys(errors).length === 0) {
                setCompletedSteps(prev => ({ ...prev, 1: true }));
                setActiveStep(step);
            }
        } else if (activeStep === 2) {
            setCompletedSteps(prev => ({ ...prev, 2: true }));
            setActiveStep(step);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        const orderData = {
            customerDetails: formData,
            items: cartItems,
            paymentMethod: paymentMethod,
            summary: {
                subtotal: subtotal,
                taxes: taxes,
                deliveryFee: selectedDeliveryFee,
                grandTotal: grandTotal,
            }
        };

        try {
            const response = await fetch('http://localhost:5001/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error!');
            }

            setIsSuccess(true);
            setCartItems([]); // Clear cart on success

        } catch (error) {
            console.error("Error submitting order:", error);
            alert("There was an issue confirming your order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="checkout-success-container">
                <div className="success-icon-wrapper"><svg className="success-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" /><path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg></div>
                <h1 className="success-title">Thank You For Your Order!</h1>
                <p className="success-message">Your box of treats is being prepared with love. A confirmation email is on its way to you.</p>
                <Link to="/" className="btn-primary-success">Back to Homepage</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return null;
    }

    return (
        <div className="main-content checkout-page-container">
            {isProcessing && <BakeryLoader />}
            <div className="checkout-form-section">
                <h1 className="checkout-title">Confirm Your Order</h1>
                <div className="checkout-stepper">
                    <div className={`step ${activeStep >= 1 ? 'active' : ''} ${activeStep > 1 ? 'completed' : ''}`} onClick={() => !isProcessing && setActiveStep(1)}>
                        <div className="step-icon"><span>1</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        Contact Info
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${activeStep >= 2 ? 'active' : ''} ${activeStep > 2 ? 'completed' : ''}`} onClick={() => !isProcessing && completedSteps[1] && setActiveStep(2)}>
                        <div className="step-icon"><span>2</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        Delivery
                    </div>
                    <div className="step-connector"></div>
                    <div className={`step ${activeStep >= 3 ? 'active' : ''} ${activeStep > 3 ? 'completed' : ''}`} onClick={() => !isProcessing && completedSteps[2] && setActiveStep(3)}>
                        <div className="step-icon"><span>3</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                        Payment
                    </div>
                </div>

                <div className={`step-content ${activeStep === 1 ? 'visible' : ''}`}>
                    <h2 className="step-title">Shipping Address</h2>
                    <div className="form-row">
                        <div className="form-group"><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={formErrors.firstName ? 'error' : ''} placeholder=" " /><label>First Name</label>{formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}</div>
                        <div className="form-group"><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={formErrors.lastName ? 'error' : ''} placeholder=" " /><label>Last Name</label>{formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}</div>
                    </div>
                    <div className="form-group"><input type="email" name="email" value={formData.email} onChange={handleInputChange} className={formErrors.email ? 'error' : ''} placeholder=" " /><label>Email Address</label>{formErrors.email && <p className="error-message">{formErrors.email}</p>}</div>
                    <div className="form-group"><input type="text" name="address" value={formData.address} onChange={handleInputChange} className={formErrors.address ? 'error' : ''} placeholder=" " /><label>Full Address</label>{formErrors.address && <p className="error-message">{formErrors.address}</p>}</div>
                    <div className="form-row">
                        <div className="form-group"><input type="text" name="city" value={formData.city} onChange={handleInputChange} className={formErrors.city ? 'error' : ''} placeholder=" " /><label>City</label>{formErrors.city && <p className="error-message">{formErrors.city}</p>}</div>
                        <div className="form-group"><input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className={formErrors.pincode ? 'error' : ''} placeholder=" " /><label>Pincode</label>{formErrors.pincode && <p className="error-message">{formErrors.pincode}</p>}</div>
                    </div>
                    <button className="btn-next" onClick={() => handleNextStep(2)}>Next: Delivery</button>
                </div>

                <div className={`step-content ${activeStep === 2 ? 'visible' : ''}`}>
                    <h2 className="step-title">Delivery Method</h2>
                    <div className="delivery-option-group">
                        <label className="delivery-option"><input type="radio" name="delivery" value={standardDeliveryFee} checked={selectedDeliveryFee === standardDeliveryFee} onChange={() => setSelectedDeliveryFee(standardDeliveryFee)} /><div className="option-content"><span className="option-title">Standard Delivery</span><span className="option-details">3-4 hours</span></div><span className="option-price">{standardDeliveryFee === 0 ? 'FREE' : `₹${standardDeliveryFee.toFixed(2)}`}</span></label>
                        <label className="delivery-option"><input type="radio" name="delivery" value={expressDeliveryFee} checked={selectedDeliveryFee === expressDeliveryFee} onChange={() => setSelectedDeliveryFee(expressDeliveryFee)} /><div className="option-content"><span className="option-title">Express Delivery</span><span className="option-details">60-90 minutes</span></div><span className="option-price">₹{expressDeliveryFee.toFixed(2)}</span></label>
                    </div>
                    <button className="btn-next" onClick={() => handleNextStep(3)}>Next: Payment</button>
                </div>

                <div className={`step-content ${activeStep === 3 ? 'visible' : ''}`}>
                    <h2 className="step-title">Payment Method</h2>
                    <p className="payment-note">All transactions are secure and encrypted.</p>
                    <div className="payment-option-group">
                        <label className="payment-option"><input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><div className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg></div><span>Credit / Debit Card</span></label>
                        <label className="payment-option"><input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} /><div className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M15 9.5a2.5 2.5 0 0 0-5 0 2.5 2.5 0 0 1-5 0"></path><path d="M12 12h.01"></path></svg></div><span>UPI (Google Pay, PhonePe)</span></label>
                        <label className="payment-option"><input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} /><div className="payment-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div><span>Cash on Delivery</span></label>
                    </div>
                    {paymentMethod === 'card' && (<div className="payment-details-content"><div className="form-group"><input type="text" placeholder=" " required /><label>Card Number</label></div><div className="form-group"><input type="text" placeholder=" " required /><label>Name on Card</label></div><div className="form-row"><div className="form-group"><input type="text" placeholder=" " required /><label>Expiry (MM/YY)</label></div><div className="form-group"><input type="text" placeholder=" " required /><label>CVV</label></div></div></div>)}
                    {paymentMethod === 'upi' && (<div className="payment-details-content upi-content"><div className="upi-qr-wrapper"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=orders@delicia&pn=DeliciaBakery" alt="UPI QR Code" /><div className="scanner-line"></div></div><p>Scan the code with any UPI app to pay <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>.</p><div className="upi-timer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>{timeLeft > 0 ? (<span>Expires in {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>) : (<span>QR Code Expired</span>)}</div></div>)}
                    {paymentMethod === 'cod' && (<div className="payment-details-content cod-content"><p>You can pay in cash when your order is delivered. Please try to have the exact amount ready for the delivery executive.</p></div>)}
                    <button className="pay-now-btn" onClick={handlePayment} disabled={isProcessing}><span className="btn-text">{paymentMethod === 'cod' ? 'Confirm Order' : `Pay ₹${grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}</span></button>
                </div>
            </div>
            <div className="order-summary-section-checkout">
                <h2 className="summary-title">Your Order</h2>
                <div className="summary-items-list">
                    {cartItems.map(item => {
                        const imageUrl = item.product_images && item.product_images['0']
                            ? item.product_images['0']
                            : 'https://placehold.co/100x100/C68C4A/FFF?text=Image';
                        return (
                            <div key={item.id} className="summary-item">
                                <img src={imageUrl} alt={item.name} className="summary-item-image" />
                                <div className="summary-item-details">
                                    <p className="summary-item-name">{item.quantity} &times; {item.name}</p>
                                </div>
                                <p className="summary-item-price">₹{(getPriceNumber(item.price) * item.quantity).toLocaleString('en-IN')}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Taxes & Charges</span><span>₹{taxes.toFixed(2)}</span></div>
                <div className="summary-row"><span>Delivery Fee</span><span>{selectedDeliveryFee === 0 ? 'FREE' : `₹${selectedDeliveryFee.toFixed(2)}`}</span></div>
                <div className="summary-total"><span>Grand Total</span><span>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
            </div>
        </div>
    );
};

export default CheckoutPage;