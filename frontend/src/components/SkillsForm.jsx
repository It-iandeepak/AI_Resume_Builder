import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft } from 'lucide-react';

const SkillsForm = ({ resumeData, setResumeData, handleNext, handlePrevious }) => {
    const defaultCategories = [
        { id: 1, title: 'Languages', skills: '' },
        { id: 2, title: 'Frontend', skills: '' },
        { id: 3, title: 'Backend', skills: '' },
        { id: 4, title: 'Databases', skills: '' },
        { id: 5, title: 'Tools/Cloud', skills: '' },
        { id: 6, title: 'Others', skills: '' }
    ];

    const [skillsList, setSkillsList] = useState([]);

    useEffect(() => {
        if (resumeData.skills && resumeData.skills.length > 0) {
            setSkillsList(resumeData.skills);
        } else {
            setSkillsList(defaultCategories);
        }
    }, []);

    const handleChange = (index, value) => {
        const newSkills = [...skillsList];
        newSkills[index].skills = value;
        setSkillsList(newSkills);
        setResumeData(prev => ({
            ...prev,
            skills: newSkills
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
                <h2 className="form-title">Technical Skills</h2>
                <p className="form-subtitle">Add your technical skills for each category</p>
                <p className="form-subtitle" style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>
                    Tip: Use *asterisks* to highlight strong skills (e.g. *React*, Node.js)
                </p>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {skillsList.map((item, index) => (
                    <div key={index}>
                        <label className="form-label">{item.title}</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder={item.title === 'Languages' ? 'Ex. C++, Python' :
                                item.title === 'Frontend' ? 'Ex. React, Angular' :
                                    item.title === 'Backend' ? 'Ex. Node.js, Django' :
                                        item.title === 'Databases' ? 'Ex. MongoDB, MySQL' :
                                            item.title === 'Tools/Cloud' ? 'Ex. AWS, Git' :
                                                item.title === 'Others' ? 'Ex. Linux, Agile' : 'Ex. Skill 1, Skill 2'}
                            value={item.skills}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <button className="btn btn-success btn-sm">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SkillsForm;
