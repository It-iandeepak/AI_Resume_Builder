import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Plus, X, Loader2, Sparkles } from 'lucide-react';
import { chatSession } from '../service/AIModal';
import { handleBoldCommand } from '../utils/textUtils';

const ExperienceForm = ({ resumeData, setResumeData, handleNext, handlePrevious }) => {
    const [experienceList, setExperienceList] = useState([]);
    const [loadingIndex, setLoadingIndex] = useState(-1);

    useEffect(() => {
        if (resumeData.experience && resumeData.experience.length > 0) {
            setExperienceList(resumeData.experience);
        }
    }, [resumeData.experience]);

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);

        // Update parent state immediately for preview
        setResumeData(prev => ({
            ...prev,
            experience: newEntries
        }));
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, {
            id: Date.now(),
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummary: ''
        }]);
    };

    const RemoveExperience = (index) => {
        const newEntries = [...experienceList];
        newEntries.splice(index, 1);
        setExperienceList(newEntries);

        setResumeData(prev => ({
            ...prev,
            experience: newEntries
        }));
    };

    const GenerateWorkSummaryFromAI = async (index) => {
        setLoadingIndex(index);
        const item = experienceList[index];
        const currentSummary = item.workSummary || '';

        const prompt = currentSummary
            ? `Job Title: ${item.title}, Company: ${item.companyName}. Enhance and rewrite the following work experience summary to be more professional and impactful, keeping it within 4-5 lines. Return the result in JSON format with field 'workSummary'. Original Summary: "${currentSummary}"`
            : `Job Title: ${item.title}, Company: ${item.companyName}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field workSummary`;

        try {
            const result = await chatSession.sendMessage(prompt);
            const response = JSON.parse(result.response.text());

            if (response.workSummary) {
                const newEntries = [...experienceList];
                newEntries[index].workSummary = response.workSummary;
                setExperienceList(newEntries);

                setResumeData(prev => ({
                    ...prev,
                    experience: newEntries
                }));
            }
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setLoadingIndex(-1);
        }
    }

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
                <h2 className="form-title">Professional Experience</h2>
                <p className="form-subtitle">Add your job experience</p>
            </div>

            {experienceList.map((item, index) => (
                <div key={index} style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    backgroundColor: 'var(--bg-white)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Experience {index + 1}</h3>
                        <button
                            onClick={() => RemoveExperience(index)}
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
                        <div className="form-group">
                            <label className="form-label">Position Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.title}
                                placeholder="Ex. Full Stack Developer"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.companyName}
                                placeholder="Ex. Google"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                name="city"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.city}
                                placeholder="Ex. New York"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">State</label>
                            <input
                                type="text"
                                name="state"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.state}
                                placeholder="Ex. NY"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.startDate}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.endDate}
                            />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 2' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label className="form-label">Work Summary</label>
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => GenerateWorkSummaryFromAI(index)}
                                    disabled={loadingIndex === index}
                                    style={{ color: '#d946ef', borderColor: '#d946ef', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '4px 8px' }}
                                >
                                    {loadingIndex === index ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                    {loadingIndex === index ? 'Generating...' : 'AI Enhance'}
                                </button>
                            </div>
                            <textarea
                                name="workSummary"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.workSummary}
                                placeholder="Describe your responsibilities and achievements..."
                                style={{ minHeight: '100px', resize: 'vertical' }}
                                onKeyDown={(e) => handleBoldCommand(e, (event) => handleChange(index, event))}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ marginBottom: '24px' }}>
                <button
                    className="btn btn-outline"
                    onClick={AddNewExperience}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderStyle: 'dashed' }}
                >
                    <Plus size={16} /> Add Experience
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

export default ExperienceForm;
