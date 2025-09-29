import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
    return (
        <div>
            <Navbar />
            {/* We are removing the <main> wrapper from here */}
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