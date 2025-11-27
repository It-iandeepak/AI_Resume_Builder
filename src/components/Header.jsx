import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'; // We'll create this for specific header styles if needed, or use inline/modules. Let's use a separate CSS file for cleaner separation or just standard CSS in index. 
// Actually, let's keep it simple and use a module or just scoped classes. I'll use standard classes.

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-wrapper">
      <div className="top-banner">
        <span className="new-badge">New</span>
        <span className="banner-text">AI Feature Added</span>
      </div>

      <header className="main-header">
        <div className="container header-content">
          <div className="logo">
            Nexume<span className="logo-dot">.</span>
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="header-actions">
            <Link to="/auth/sign-up" className="btn btn-primary">Get started</Link>
            <Link to="/auth/login" className="btn btn-outline">Login</Link>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
