import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotificationModal.css';

const NotificationModal = ({ product, quantity, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000); // Stays open for 4 seconds before auto-closing
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`notification-container ${isVisible ? 'visible' : ''}`} onClick={onClose}>
            <div className="notification-icon">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
            <div className="notification-content">
                <p className="notification-title">Added to Your Box!</p>
                <p className="notification-details">
                    {quantity} &times; <strong>{product.name}</strong>
                </p>
            </div>
            <Link to="/cart" className="notification-btn-view">View Box</Link>
            <div className="notification-progress-bar"></div>
        </div>
    );
};

export default NotificationModal;