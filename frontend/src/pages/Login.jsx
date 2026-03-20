import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email.');
            return;
        }
        if (!password) {
            setError('Please enter your password.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('userId', data.user.id);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Login</h2>
                <p className="signup-subtitle">Please login to continue</p>

                {error && (
                    <div className="error-banner">
                        {error}
                    </div>
                )}

                <form className="signup-form" onSubmit={handleSubmit}>
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
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div className="form-footer">
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block signup-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-text">Logging in...</span>
                        ) : (
                            <>Login <ArrowRight size={16} style={{ marginLeft: '8px' }} /></>
                        )}
                    </button>

                    <div className="login-link-container">
                        <span className="login-text">Don't have an account? </span>
                        <Link to="/auth/sign-up" className="login-link">Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
