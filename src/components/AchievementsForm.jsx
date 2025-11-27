import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react';

const AchievementsForm = ({ resumeData, setResumeData, handleNext, handlePrevious }) => {
    const [achievementsList, setAchievementsList] = useState([]);
    const [achievementInput, setAchievementInput] = useState('');

    useEffect(() => {
        if (resumeData.achievements && resumeData.achievements.length > 0) {
            setAchievementsList(resumeData.achievements);
        }
    }, [resumeData.achievements]);

    const handleAddAchievement = () => {
        if (!achievementInput.trim()) return;

        const newAchievements = [...achievementsList, achievementInput.trim()];
        setAchievementsList(newAchievements);
        setResumeData(prev => ({
            ...prev,
            achievements: newAchievements
        }));
        setAchievementInput('');
    };

    const handleRemoveAchievement = (index) => {
        const newAchievements = achievementsList.filter((_, i) => i !== index);
        setAchievementsList(newAchievements);
        setResumeData(prev => ({
            ...prev,
            achievements: newAchievements
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddAchievement();
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
                <h2 className="form-title">Achievements</h2>
                <p className="form-subtitle">Add your key achievements</p>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Add Achievement</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Ex. Global rank 2041 on Leetcode"
                        value={achievementInput}
                        onChange={(e) => setAchievementInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1 }}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleAddAchievement}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>

            <div className="skills-preview-box" style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '16px',
                minHeight: '100px',
                marginBottom: '24px'
            }}>
                {(!achievementsList || achievementsList.length === 0) ? (
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
                        <p style={{ fontSize: '13px' }}>No achievements added yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {achievementsList.map((item, index) => (
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
                                    onClick={() => handleRemoveAchievement(index)}
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

export default AchievementsForm;
