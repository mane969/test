
import React from 'react';
import { Link } from 'react-router-dom';
import './CommunitySection.css';

const CommunitySection = () => {
    return (
        <section className="community-section">
            <div className="community-overlay"></div>
            <div className="community-content">
                <h2>Baked for Pune, by Pune</h2>
                <p>
                    We're proud to be a part of the vibrant Pune community. We partner with local farmers and suppliers to source the freshest ingredients, because we believe that the best flavors come from our own soil. Delicia is more than a bakery—it's a celebration of local taste and craftsmanship.
                </p>
                <Link to="/about" className="community-button">Learn Our Story</Link>
            </div>
        </section>
    );
};

export default CommunitySection;
