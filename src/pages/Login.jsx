import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Reusing the same styles for consistency

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            let data;
            console.log("Response status:", response.status, response.statusText);
            const text = await response.text();

            try {
                data = JSON.parse(text);
            } catch (err) {
                console.error("Server returned non-JSON:", text);
                throw new Error("Server error (non-JSON response). Please check backend logs.");
            }

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.user.name);
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(`An error occurred during login: ${error.message}`);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Login</h2>
                <p className="signup-subtitle">Please login to continue</p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-icon">
                            <Mail size={18} />
                        </div>
                        <input type="email" placeholder="Email id" className="form-input" />
                    </div>

                    <div className="form-group">
                        <div className="input-icon">
                            <Lock size={18} />
                        </div>
                        <input type="password" placeholder="Password" className="form-input" />
                    </div>

                    <div className="form-footer">
                        <a href="#" className="forgot-password">Forget password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block signup-btn">
                        Login
                    </button>

                    <div className="login-link-container">
                        <span className="login-text">Don't have an account? </span>
                        <Link to="/auth/sign-up" className="login-link">click here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
