import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user info in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('userId', data.user.id);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign up</h2>
                <p className="signup-subtitle">Please register to continue</p>

                {error && (
                    <div className="error-banner">
                        {error}
                    </div>
                )}

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <Lock size={18} />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password (min 8 characters)"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block signup-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-text">Creating account...</span>
                        ) : (
                            <>Sign up <ArrowRight size={16} style={{ marginLeft: '8px' }} /></>
                        )}
                    </button>

                    <div className="login-link-container">
                        <span className="login-text">Already have an account? </span>
                        <Link to="/auth/login" className="login-link">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
