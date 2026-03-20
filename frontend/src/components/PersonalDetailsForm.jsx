import React from 'react';
import { LayoutTemplate, Palette, ChevronRight, User } from 'lucide-react';

const PersonalDetailsForm = ({ resumeData, handleInputChange, handleNext }) => {
    return (
        <div className="personal-details-form">
            <div className="form-header-actions">
                <div className="form-tabs">
                    <button className="form-tab active">
                        <LayoutTemplate size={14} /> Template
                    </button>
                    <button className="form-tab">
                        <Palette size={14} /> Accent
                    </button>
                </div>
                <button
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={handleNext}
                >
                    Next <ChevronRight size={14} />
                </button>
            </div>

            <h2 className="form-title">Personal Information</h2>
            <p className="form-subtitle">Get Started with the personal information</p>

            <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">Full Name <span className="required">*</span></label>
                    <input
                        type="text"
                        name="fullName"
                        className="form-input"
                        placeholder="Enter your full name"
                        value={resumeData.fullName || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Enter your email address"
                        value={resumeData.email || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-input"
                        placeholder="Enter your phone number"
                        value={resumeData.phone || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        name="address"
                        className="form-input"
                        placeholder="Enter your location"
                        value={resumeData.address || ''}
                        onChange={handleInputChange}
                    />
                </div>


                <div className="form-group">
                    <label className="form-label">LinkedIn</label>
                    <input
                        type="text"
                        name="linkedin"
                        className="form-input"
                        placeholder="Enter your LinkedIn URL"
                        value={resumeData.linkedin || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">GitHub</label>
                    <input
                        type="text"
                        name="github"
                        className="form-input"
                        placeholder="Enter your GitHub URL"
                        value={resumeData.github || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Portfolio</label>
                    <input
                        type="text"
                        name="website"
                        className="form-input"
                        placeholder="Enter your website URL"
                        value={resumeData.website || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">LeetCode</label>
                    <input
                        type="text"
                        name="leetcode"
                        className="form-input"
                        placeholder="Enter your LeetCode URL"
                        value={resumeData.leetcode || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">GeeksForGeeks</label>
                    <input
                        type="text"
                        name="geeksforgeeks"
                        className="form-input"
                        placeholder="Enter your GeeksForGeeks URL"
                        value={resumeData.geeksforgeeks || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
