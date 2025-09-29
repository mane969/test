import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section about">
                    {/* Update the brand name here */}
                    <h3 className="footer-brand">Delicia</h3>
                    <p>
                        Baking moments of joy since 2023. We are dedicated to providing the freshest, most delicious baked goods in Pune.
                    </p>
                </div>
                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <a href="#" className="social-link">Facebook</a>
                    <a href="#" className="social-link">Instagram</a>
                    <a href="#" className="social-link">Twitter</a>
                </div>
            </div>
            <div className="footer-bottom">
                {/* Update the copyright here */}
                &copy; {currentYear} Delicia. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;