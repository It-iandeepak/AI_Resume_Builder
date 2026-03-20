import React from 'react';
import { Globe, Linkedin, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section" id="contact">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand-col">
                        <div className="logo footer-logo">
                            Nexume<span className="logo-dot">.</span>
                        </div>
                    </div>

                    <div className="footer-links-col">
                        <h4 className="footer-heading">Product</h4>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Pricing</a></li>
                            <li><a href="#">Affiliate</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-col">
                        <h4 className="footer-heading">Resources</h4>
                        <ul className="footer-links">
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Community</a></li>
                            <li>
                                <a href="#" className="hiring-link">
                                    Careers <span className="hiring-badge">We're hiring!</span>
                                </a>
                            </li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-col">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                        </ul>
                    </div>

                    <div className="footer-info-col">
                        <p className="footer-desc">
                            Making every customer feel valued—no matter the size of your audience.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Globe size={20} /></a>
                            <a href="https://www.linkedin.com/in/deepak-kumar-18999232b/" className="social-link"><Linkedin size={20} /></a>
                        </div>
                        <p className="copyright">© 2025 Resume Builder</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
