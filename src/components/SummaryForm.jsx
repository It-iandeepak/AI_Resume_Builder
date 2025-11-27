import React, { useState } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import { chatSession } from '../service/AIModal';

const SummaryForm = ({ resumeData, handleInputChange, handleNext, handlePrevious }) => {
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const currentSummary = resumeData?.summary || '';
        const prompt = currentSummary
            ? `Job Title: ${resumeData?.jobTitle}. Enhance and rewrite the following professional summary to be more professional and impactful, keeping it within 4-5 lines. Return the result in JSON format with field 'summary'. Original Summary: "${currentSummary}"`
            : `Job Title: ${resumeData?.jobTitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with field summary Experience Level: ${resumeData?.experienceLevel || 'Mid Level'}`;

        try {
            const result = await chatSession.sendMessage(prompt);
            console.log(result.response.text());
            const response = JSON.parse(result.response.text());

            if (response.summary) {
                // Create a synthetic event to update the state
                const e = {
                    target: {
                        name: 'summary',
                        value: response.summary
                    }
                };
                handleInputChange(e);
            }
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setLoading(false);
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                    <h2 className="form-title">Profile Summary</h2>
                    <p className="form-subtitle">Add summary for your resume here</p>
                </div>
                <button
                    className="btn btn-outline btn-sm"
                    onClick={GenerateSummaryFromAI}
                    disabled={loading}
                    style={{ color: '#d946ef', borderColor: '#d946ef', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    {loading ? 'Generating...' : 'AI Enhance'}
                </button>
            </div>

            <div className="form-group">
                <textarea
                    name="summary"
                    className="form-input"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                    value={resumeData.summary || ''}
                    onChange={handleInputChange}
                    style={{ minHeight: '150px', resize: 'vertical' }}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button className="btn btn-success btn-sm">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SummaryForm;
