import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeometricBackground from './components/GeometricBackground'; // Keep the global background
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AboutUs from './pages/AboutUs'; // Keep the new About Us import
import './App.css';

function App() {
    return (
        <div className="app-container">
            {/* The background is here, rendered once for all pages */}
            <GeometricBackground />

            <div className="content-wrapper">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} /> {/* Keep the new About Us route */}
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default App;

