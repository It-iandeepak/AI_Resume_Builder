import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star, ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero-section" id="home">
            <div className="hero-background"></div>
            <div className="container hero-content">

                <div className="social-proof-badge">
                    <div className="avatars">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                        <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="User" />
                        <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" />
                        <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="User" />
                    </div>
                    <div className="rating">
                        <div className="stars">
                            <Star size={14} fill="#d946ef" stroke="#d946ef" />
                            <Star size={14} fill="#d946ef" stroke="#d946ef" />
                            <Star size={14} fill="#d946ef" stroke="#d946ef" />
                            <Star size={14} fill="#d946ef" stroke="#d946ef" />
                            <Star size={14} fill="#d946ef" stroke="#d946ef" />
                        </div>
                        <span className="rating-text">Used by 10,000+ users</span>
                    </div>
                </div>

                <h1 className="hero-headline">
                    Land your dream job with <br />
                    <span className="highlight">AI-powered resumes.</span>
                </h1>

                <p className="hero-subheadline">
                    Create, edit and download professional resumes with <br />
                    AI-powered assistance.
                </p>

                <div className="hero-cta">
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/auth/sign-up')}>
                        Get started <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </button>
                    <button className="btn btn-outline btn-lg">
                        <Play size={18} style={{ marginRight: '8px' }} /> Try demo
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Hero;
