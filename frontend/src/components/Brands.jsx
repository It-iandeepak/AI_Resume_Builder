import React from 'react';
import './Brands.css';

const Brands = () => {
    return (
        <section className="brands-section">
            <div className="container">
                <p className="brands-title">Trusting by leading brands, including</p>
                <div className="brands-grid">
                    {/* Using text representations styled to look like logos since we don't have SVGs */}
                    <span className="brand-logo instagram">Instagram</span>
                    <span className="brand-logo framer">Framer</span>
                    <span className="brand-logo microsoft">Microsoft</span>
                    <span className="brand-logo huawei">HUAWEI</span>
                    <span className="brand-logo walmart">Walmart</span>
                </div>
            </div>
        </section>
    );
};

export default Brands;
