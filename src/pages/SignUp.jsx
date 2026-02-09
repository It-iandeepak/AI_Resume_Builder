import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email: e.target[1].value, password }),
            });

            let data;
            console.log("Response status:", response.status, response.statusText);
            const text = await response.text();
            console.log("Response body text:", text.substring(0, 200)); // Log first 200 chars

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
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert(`An error occurred during signup: ${error.message}`);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Sign up</h2>
                <p className="signup-subtitle">Please register to continue</p>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-icon">
                            <User size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-footer">
                        <a href="#" className="forgot-password">Forget password?</a>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block signup-btn">
                        Sign up
                    </button>

                    <div className="login-link-container">
                        <span className="login-text">Already have an account? </span>
                        <Link to="/auth/login" className="login-link">click here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
