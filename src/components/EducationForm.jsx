import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react';

const EducationForm = ({ resumeData, setResumeData, handleNext, handlePrevious }) => {
    const [educationList, setEducationList] = useState([]);

    useEffect(() => {
        if (resumeData.education && resumeData.education.length > 0) {
            setEducationList(resumeData.education);
        }
    }, [resumeData.education]);

    const handleChange = (index, event) => {
        const newEntries = [...educationList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);

        setResumeData(prev => ({
            ...prev,
            education: newEntries
        }));
    };

    const AddNewEducation = () => {
        setEducationList([...educationList, {
            id: Date.now(),
            institution: '',
            degree: '',
            startDate: '',
            endDate: '',
            grade: ''
        }]);
    };

    const RemoveEducation = (index) => {
        const newEntries = [...educationList];
        newEntries.splice(index, 1);
        setEducationList(newEntries);

        setResumeData(prev => ({
            ...prev,
            education: newEntries
        }));
    };

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
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="btn btn-outline btn-sm"
                        onClick={handlePrevious}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        <ChevronLeft size={14} /> Previous
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleNext}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div className="form-title-section" style={{ marginBottom: '24px' }}>
                <h2 className="form-title">Education</h2>
                <p className="form-subtitle">Add your educational background</p>
            </div>

            {educationList.map((item, index) => (
                <div key={index} style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    backgroundColor: 'var(--bg-white)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Education {index + 1}</h3>
                        <button
                            onClick={() => RemoveEducation(index)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px'
                            }}
                        >
                            <X size={14} /> Remove
                        </button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Institution Name</label>
                            <input
                                type="text"
                                name="institution"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.institution}
                                placeholder="Ex. Rungta College of Engineering"
                            />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Degree / Class</label>
                            <input
                                type="text"
                                name="degree"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.degree}
                                placeholder="Ex. Bachelor of Technology in Computer Science"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.startDate}
                                placeholder="Ex. 2022"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.endDate}
                                placeholder="Ex. 2026"
                            />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <label className="form-label">Grade / CGPA</label>
                            <input
                                type="text"
                                name="grade"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.grade}
                                placeholder="Ex. CGPA: 7.5/10 or 78.4%"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ marginBottom: '24px' }}>
                <button
                    className="btn btn-outline"
                    onClick={AddNewEducation}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderStyle: 'dashed' }}
                >
                    <Plus size={16} /> Add Education
                </button>
            </div>

            <div>
                <button className="btn btn-success btn-sm">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EducationForm;
