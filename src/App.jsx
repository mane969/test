// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeometricBackground from './components/GeometricBackground';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import AboutUs from './pages/AboutUs';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
    // State for the product detail modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    // State for the shopping cart, initialized from localStorage
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    // Effect to save the cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Function to add a product to the cart
    const handleAddToCart = (product, quantity) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                // If item exists, update its quantity
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If item doesn't exist, add it to the cart
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    // Functions to handle opening and closing the product detail modal
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="app-container">
            <svg style={{ display: 'none' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <GeometricBackground />
            <div className="content-wrapper">
                <Navbar />
                <main className="main-page-content">
                    <Routes>
                        <Route path="/" element={<HomePage onProductSelect={handleProductSelect} />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/products" element={<CategoriesPage />} />
                        <Route path="/products/:categoryName" element={<ProductListPage onProductSelect={handleProductSelect} />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />

                        {/* --- THIS IS THE CORRECTED, CONFLICT-FREE LINE --- */}
                        <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />} />

                    </Routes>
                </main>
                <Footer />
            </div>

            {/* Render the modal when a product is selected */}
            {selectedProduct && (
                <ProductDetailPage
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}

export default App;