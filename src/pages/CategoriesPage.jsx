import React from 'react';
import CategoryCard from '../components/CategoryCard';
import { categoriesData } from '../data/categories'; // <-- This now correctly points to your existing file
import './ProductsPage.css';

const CategoriesPage = () => {
    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">Our Collections</h1>
            <div className="products-page-grid">
                {categoriesData.map(category => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;