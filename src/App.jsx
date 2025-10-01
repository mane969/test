import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeometricBackground from './components/GeometricBackground'; // Import it here
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <GeometricBackground /> {/* Place it here, once */}
            
            <div className="content-wrapper"> 
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default App;