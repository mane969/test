import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import GeometricBackground from './components/GeometricBackground'; // 1. DELETE THIS LINE
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
    return (
        <div>
            {/* <GeometricBackground /> */} {/* 2. DELETE THIS LINE */}
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;