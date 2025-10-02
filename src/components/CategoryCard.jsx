// src/components/CategoryCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
    // Create a URL-friendly version of the category name (e.g., "Custom Cakes" -> "custom-cakes")
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');

    return (
        <Link to={`/products/${categorySlug}`} className="category-card">
            <img src={category.imageUrl} alt={category.name} className="category-card-image" />
            <div className="category-card-overlay">
                <h3 className="category-card-title">{category.name}</h3>
            </div>
        </Link>
    );
};

export default CategoryCard;