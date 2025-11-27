import React, { useState, useEffect } from 'react';
import { LayoutTemplate, Palette, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react';
import { handleBoldCommand } from '../utils/textUtils';

const ProjectsForm = ({ resumeData, setResumeData, handleNext, handlePrevious }) => {
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        if (resumeData.projects && resumeData.projects.length > 0) {
            setProjectsList(resumeData.projects);
        }
    }, [resumeData.projects]);

    const handleChange = (index, event) => {
        const newEntries = [...projectsList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setProjectsList(newEntries);

        setResumeData(prev => ({
            ...prev,
            projects: newEntries
        }));
    };

    const AddNewProject = () => {
        setProjectsList([...projectsList, {
            id: Date.now(),
            title: '',
            techStack: '',
            githubLink: '',
            liveLink: '',
            demoLink: '',
            description: ''
        }]);
    };

    const RemoveProject = (index) => {
        const newEntries = [...projectsList];
        newEntries.splice(index, 1);
        setProjectsList(newEntries);

        setResumeData(prev => ({
            ...prev,
            projects: newEntries
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
                <h2 className="form-title">Projects</h2>
                <p className="form-subtitle">Add your key projects</p>
            </div>

            {projectsList.map((item, index) => (
                <div key={index} style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    backgroundColor: 'var(--bg-white)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600' }}>Project {index + 1}</h3>
                        <button
                            onClick={() => RemoveProject(index)}
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
                            <label className="form-label">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.title}
                                placeholder="Ex. AI Chatbot"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tech Stack</label>
                            <input
                                type="text"
                                name="techStack"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.techStack}
                                placeholder="Ex. React.js, Node.js"
                                onKeyDown={(e) => handleBoldCommand(e, (event) => handleChange(index, event))}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">GitHub Link</label>
                            <input
                                type="text"
                                name="githubLink"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.githubLink}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Live Link</label>
                            <input
                                type="text"
                                name="liveLink"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.liveLink}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Demo Link</label>
                            <input
                                type="text"
                                name="demoLink"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.demoLink}
                            />
                        </div>
                        <div className="form-group" style={{ gridColumn: 'span 1' }}>
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-input"
                                onChange={(event) => handleChange(index, event)}
                                value={item.description}
                                placeholder="Describe the project features and your role..."
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
                    onClick={AddNewProject}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderStyle: 'dashed' }}
                >
                    <Plus size={16} /> Add Project
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

export default ProjectsForm;
