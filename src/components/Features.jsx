import React from 'react';
import { Key, Shield, FileText, Zap } from 'lucide-react';
import './Features.css';

const Features = () => {
    return (
        <section className="features-section" id="features">
            <div className="container">
                <div className="features-header">
                    <div className="features-badge">
                        <Zap size={14} fill="currentColor" /> Simple Process
                    </div>
                    <h2 className="features-headline">Build your resume</h2>
                    <p className="features-subheadline">
                        Our streamlined process helps you create a professional resume in minutes with
                        intelligent AI-powered tools and features.
                    </p>
                </div>

                <div className="features-content">
                    <div className="features-image-col">
                        <div className="image-wrapper">
                            {/* Placeholder for the collage in the screenshot */}
                            <img
                                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
                                alt="Resume Builder Interface"
                                className="feature-main-img"
                            />
                            <div className="image-overlay-gradient"></div>
                        </div>
                    </div>

                    <div className="features-list-col">
                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <Key size={24} />
                            </div>
                            <div className="feature-text">
                                <h3>Real-Time Analytics</h3>
                                <p>Get instant insights into your finances with live dashboards.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <Shield size={24} />
                            </div>
                            <div className="feature-text">
                                <h3>Bank-Grade Security</h3>
                                <p>End-to-end encryption, 2FA, compliance with GDPR standards.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon-box">
                                <FileText size={24} />
                            </div>
                            <div className="feature-text">
                                <h3>Customizable Reports</h3>
                                <p>Export professional, audit-ready financial reports for tax or internal review.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
