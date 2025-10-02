// src/components/ProductFilterSidebar.jsx

import React, { useRef, useCallback } from 'react';
import './ProductFilterSidebar.css';

const ProductFilterSidebar = ({
    priceRange,
    setPriceRange,
    availableTags,
    selectedTags,
    handleTagChange,
    sortBy,
    setSortBy,
    clearFilters
}) => {
    const minPrice = 0;
    const maxPrice = 3000;

    const rangeRef = useRef(null);

    const getPercent = useCallback((value) =>
        Math.round(((value - minPrice) / (maxPrice - minPrice)) * 100),
        [minPrice, maxPrice]
    );

    return (
        <aside className="filter-sidebar-godlevel">
            <div className="filter-section">
                {/* V-- The wrapper now only contains the title --V */}
                <div className="filter-title-wrapper">
                    <h3 className="filter-title">Price Range</h3>
                </div>
                {/* V-- The price values are now here, on a new line --V */}
                <div className="price-values">
                    <span>₹{priceRange[0]}</span>-<span>₹{priceRange[1]}</span>
                </div>
                <div className="price-slider">
                    <div className="price-slider__track"></div>
                    <div ref={rangeRef} className="price-slider__range" style={{ left: `${getPercent(priceRange[0])}%`, right: `${100 - getPercent(priceRange[1])}%` }}></div>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => {
                            const value = Math.min(Number(e.target.value), priceRange[1] - 50);
                            setPriceRange([value, priceRange[1]]);
                        }}
                        className="thumb thumb--left"
                        data-magnetic={priceRange[0] === 0}
                    />
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => {
                            const value = Math.max(Number(e.target.value), priceRange[0] + 50);
                            setPriceRange([priceRange[0], value]);
                        }}
                        className="thumb thumb--right"
                    />
                </div>
            </div>

            <div className="filter-section">
                <h3 className="filter-title">Filter by Tags</h3>
                <div className="tags-container-godlevel">
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            className={`tag-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                            onClick={() => handleTagChange({ target: { value: tag, checked: !selectedTags.includes(tag) } })}
                        >
                            <span className="goo-container">
                                <span className="gooey-dot"></span>
                                <span className="gooey-dot"></span>
                                <span className="gooey-dot"></span>
                            </span>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h3 className="filter-title">Sort By</h3>
                <div className="custom-select-wrapper">
                    <select className="sort-by-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A-Z</option>
                    </select>
                </div>
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
                <span>Clear All Filters</span>
            </button>
        </aside>
    );
};

export default ProductFilterSidebar;