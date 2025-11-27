import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2 className="cta-headline">
                        Build a Professional Resume That Helps You Stand Out and Get Hired
                    </h2>
                    <Link to="/auth/sign-up" className="btn btn-primary btn-lg cta-btn">
                        Get Started <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
