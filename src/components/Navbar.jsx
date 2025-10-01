import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="navbar-brand" onClick={closeMenu}>
                <img src="/images/logo.png" alt="Delicia Logo" className="navbar-logo" />
            </Link>

            <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
                <li><NavLink to="/products" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink></li>
                <li><NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li>
                <li><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About Us</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;

