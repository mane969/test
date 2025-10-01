import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeometricBackground from './components/GeometricBackground';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AboutUs from './pages/AboutUs';
import ProductDetailPage from './pages/ProductDetailPage'; // Import the modal here
import './App.css';

function App() {
    // State for the selected product is now managed here, at the top level
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="app-container">
            <GeometricBackground /> 


            <div className="content-wrapper">
                <Navbar />
                <main className="main-page-content">
                    <Routes>
                        {/* Pass the handler down to the HomePage */}
                        <Route path="/" element={<HomePage onProductSelect={handleProductSelect} />} />
                        <Route path="/about" element={<AboutUs />} />
                        {/* Pass the handler down to the ProductsPage */}
                        <Route path="/products" element={<ProductsPage onProductSelect={handleProductSelect} />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>

            {/* The Product Detail Modal is now rendered globally here */}
            {selectedProduct && (
                <ProductDetailPage
                    product={selectedProduct}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default App;