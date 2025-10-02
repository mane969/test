// src/pages/CategoriesPage.jsx

import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { categoriesData } from '../data/categories'; // <-- You will need to create this data file
import './ProductsPage.css'; // We can reuse the same CSS for the title

const CategoriesPage = () => {
    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Categories</h1>
            <div className="products-page-grid">
                {categoriesData.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;