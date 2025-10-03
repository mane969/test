// src/pages/ProductListPage.jsx

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// REMOVED: import { productsData } from '../data/products'; // Data is now fetched via API
import ProductCard from '../components/ProductCard';
import ProductFilterSidebar from '../components/ProductFilterSidebar';
import './ProductsPage.css';

// Helper function to parse price string like "₹650" into a number
// NOTE: This assumes price is a string like "₹2000" as shown in your screenshot.
const getPriceNumber = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        return parseFloat(price.replace('₹', '').replace(/,/g, ''));
    }
    return 0; // Default if price format is unexpected
};

const ProductListPage = ({ onProductSelect }) => {
    const { categoryName } = useParams();

    // --- NEW STATE FOR API DATA ---
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- STATE MANAGEMENT FOR FILTERS ---
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortBy, setSortBy] = useState('default');

    // NEW: Function to fetch data from the backend
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Using a relative path works if you set up the 'proxy' in package.json
            // If you don't use a proxy, use the full path: 'http://localhost:5001/api/products'
            const response = await fetch('/api/products'); 

            if (!response.ok) {
                // If the server returns a 500 status (e.g., Firebase error)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            // Only accept an array of products
            if (Array.isArray(data)) {
                setProductsData(data);
            } else {
                throw new Error("API returned unexpected data format.");
            }

        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError(`Could not load products: ${err.message}. Check if your backend server (port 5001) is running.`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    // ----------------------------------------------------
    // FILTERING AND SORTING LOGIC (Using fetched productsData)
    // ----------------------------------------------------

    // Filter products by category once
    const productsInCategory = useMemo(() => {
        // Create a slug from the category name from Firestore data for comparison
        const categorySlug = (category) => 
            category ? String(category).toLowerCase().replace(/\s+/g, '-') : '';

        return productsData.filter(
            product => product.category && categorySlug(product.category) === categoryName
        );
    }, [categoryName, productsData]);


    // Get a unique list of available tags
    const availableTags = useMemo(() => {
        const tags = new Set();
        productsInCategory.forEach(product => {
            // Check if product.tags is present and an array (based on your screenshot)
            if (Array.isArray(product.tags)) { 
                product.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags);
    }, [productsInCategory]);

    // Apply filters and sorting
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...productsInCategory];

        // 1. Filter by Price
        filtered = filtered.filter(p => {
            const price = getPriceNumber(p.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });

        // 2. Filter by Tags
        if (selectedTags.length > 0) {
            filtered = filtered.filter(p =>
                // Ensure the product has tags and that ALL selectedTags are present
                Array.isArray(p.tags) && selectedTags.every(tag => p.tags.includes(tag))
            );
        }

        // 3. Sort (Logic remains the same)
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => getPriceNumber(a.price) - getPriceNumber(b.price));
                break;
            case 'price-desc':
                filtered.sort((a, b) => getPriceNumber(b.price) - getPriceNumber(a.price));
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return filtered;
    }, [productsInCategory, priceRange, selectedTags, sortBy]);

    // ----------------------------------------------------
    // HANDLERS AND RENDER
    // ----------------------------------------------------

    const handleTagChange = (event) => {
        const { value, checked } = event.target;
        setSelectedTags(prev =>
            checked ? [...prev, value] : prev.filter(tag => tag !== value)
        );
    };

    const clearFilters = () => {
        setPriceRange([0, 3000]);
        setSelectedTags([]);
        setSortBy('default');
    };

    const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, ' ');

    // Render logic for Loading and Errors
    if (isLoading) {
        return <div className="main-content"><h2 className="loading-message">Loading Delicious Treats... 🍰</h2></div>;
    }

    if (error) {
        return <div className="main-content"><h2 className="error-message">Connection Error!</h2><p>{error}</p></div>;
    }

    return (
        <div className="main-content products-page-container">
            <h1 className="products-page-title">{pageTitle}</h1>
            <div className="products-layout">
                <ProductFilterSidebar
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    handleTagChange={handleTagChange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    clearFilters={clearFilters}
                />
                <div className="products-page-grid">
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map(product => (
                            // product.id is provided by the server
                            <ProductCard
                                key={product.id}
                                product={product}
                                onCardClick={onProductSelect}
                            />
                        ))
                    ) : (
                        <div className="no-results-container-godlevel">
                            <div className="no-results-bg">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#FFD5A5" d="M39.6,-48.9C54.6,-38.3,72.4,-29.4,76.5,-16.1C80.6,-2.8,71.1,14.9,61.4,28.9C51.7,42.9,41.8,53.2,29.8,60.8C17.7,68.4,3.5,73.4,-11.2,72.2C-25.9,71,-41.2,63.7,-53.4,52.8C-65.6,41.9,-74.8,27.5,-76.9,12.3C-79,-2.9,-74,-18.9,-65.4,-31.6C-56.8,-44.3,-44.6,-53.8,-31.7,-60.7C-18.8,-67.6,-5.2,-71.9,8.1,-69.1C21.4,-66.3,42.7,-56.3,39.6,-48.9Z" transform="translate(100 100)" />
                                </svg>
                            </div>
                            <h3>No Treats Found</h3>
                            <p>Try adjusting your filters to discover other delicious creations.</p>
                            <button onClick={clearFilters} className="clear-filters-btn">Clear All Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;