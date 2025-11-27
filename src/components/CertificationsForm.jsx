import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react';

const CertificationsForm = ({ resumeData, setResumeData, handleNext, handlePrevious, handleFinish }) => {
    const [certificationsList, setCertificationsList] = useState([]);
    const [certificationInput, setCertificationInput] = useState('');

    useEffect(() => {
        if (resumeData.certifications && resumeData.certifications.length > 0) {
            setCertificationsList(resumeData.certifications);
        }
    }, [resumeData.certifications]);

    const handleAddCertification = () => {
        if (!certificationInput.trim()) return;

        const newCertifications = [...certificationsList, certificationInput.trim()];
        setCertificationsList(newCertifications);
        setResumeData(prev => ({
            ...prev,
            certifications: newCertifications
        }));
        setCertificationInput('');
    };

    const handleRemoveCertification = (index) => {
        const newCertifications = certificationsList.filter((_, i) => i !== index);
        setCertificationsList(newCertifications);
        setResumeData(prev => ({
            ...prev,
            certifications: newCertifications
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCertification();
        }
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
                    {/* Last step, so maybe just Save or Finish? But keeping Next for consistency/future */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleFinish}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        Finish <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            <div className="form-title-section" style={{ marginBottom: '24px' }}>
                <h2 className="form-title">Certifications</h2>
                <p className="form-subtitle">Add your certifications</p>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Add Certification</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ex. Microsoft Certified: Azure Fundamentals [Link](url)"
                        value={certificationInput}
                        onChange={(e) => setCertificationInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1 }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleAddCertification}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                    Tip: Use <code>[Link Text](url)</code> to add clickable links.
                </p>
            </div>

            <div className="skills-preview-box" style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '16px',
                minHeight: '100px',
                marginBottom: '24px'
            }}>
                {(!certificationsList || certificationsList.length === 0) ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        height: '100%',
                        gap: '8px',
                        padding: '20px'
                    }}>
                        <p style={{ fontSize: '13px' }}>No certifications added yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {certificationsList.map((item, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                backgroundColor: 'var(--bg-light)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                fontSize: '13px',
                                color: 'var(--text-main)'
                            }}>
                                <div>{item}</div>
                                <button
                                    onClick={() => handleRemoveCertification(index)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#ef4444'
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button className="btn btn-success btn-sm">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default CertificationsForm;
