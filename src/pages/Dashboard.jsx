import React, { useEffect, useState } from 'react';
import { Plus, Upload, LogOut, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CreateResumeModal from '../components/CreateResumeModal';
import UploadResumeModal from '../components/UploadResumeModal';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('User');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/resumes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // Map backend data to frontend structure if needed, but they should match closely
                setResumes(data.map(r => ({ id: r.resumeId, ...r })));
            }
        } catch (error) {
            console.error('Error fetching resumes:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    const handleCreateResume = async (title) => {
        const newResumeId = uuidv4();
        const initialData = {
            resumeId: newResumeId,
            title: title,
            fullName: '',
            jobTitle: '',
            address: '',
            phone: '',
            email: '',
            themeColor: '#00008b',
            summary: '',
            skills: [],
            experience: [],
            achievements: [],
            projects: [],
            education: [],
            certifications: []
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(initialData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                navigate(`/resume/${newResumeId}/edit`);
            }
        } catch (error) {
            console.error('Error creating resume:', error);
            alert('Failed to create resume');
        }
    };

    const handleUploadResume = async (title, file, parsedData = {}) => {
        const newResumeId = uuidv4();

        // Transform AI data to match frontend schema
        const formattedSkills = parsedData.skills ? [{
            title: "Technical Skills",
            skills: parsedData.skills.map(s => s.name).join(', ')
        }] : [];

        const formattedExperience = parsedData.experience ? parsedData.experience.map(exp => ({
            title: exp.title || '',
            companyName: exp.companyName || '',
            city: exp.city || '',
            state: exp.state || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            workSummary: exp.workSummary || ''
        })) : [];

        const formattedEducation = parsedData.education ? parsedData.education.map(edu => ({
            institution: edu.universityName || '',
            degree: edu.degree || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            grade: '' // AI doesn't usually get this
        })) : [];

        const formattedProjects = parsedData.projects ? parsedData.projects.map(proj => ({
            title: proj.title || '',
            description: proj.description || '',
            techStack: proj.techStack || '',
            githubLink: proj.github || '',
            liveLink: proj.link || '',
            demoLink: ''
        })) : [];

        const formattedAchievements = parsedData.achievements ? parsedData.achievements.map(ach =>
            `**${ach.title}**: ${ach.description}`
        ) : [];

        const formattedCertifications = parsedData.certifications ? parsedData.certifications.map(cert =>
            `**${cert.name}** - ${cert.issuer} (${cert.date})`
        ) : [];

        const initialData = {
            resumeId: newResumeId,
            title: title,
            fileName: file.name,
            fullName: parsedData.fullName || '',
            jobTitle: parsedData.jobTitle || '',
            address: parsedData.address || '',
            phone: parsedData.phone || '',
            email: parsedData.email || '',
            themeColor: '#00008b',
            summary: parsedData.summary || '',
            skills: formattedSkills,
            experience: formattedExperience,
            achievements: formattedAchievements,
            projects: formattedProjects,
            education: formattedEducation,
            certifications: formattedCertifications
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5001/api/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(initialData)
            });

            if (response.ok) {
                setIsUploadModalOpen(false);
                navigate(`/resume/${newResumeId}/edit`);
            }
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume');
        }
    };

    const handleDeleteResume = async (e, resumeId) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5001/api/resumes/${resumeId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setResumes(prev => prev.filter(r => r.id !== resumeId));
                }
            } catch (error) {
                console.error('Error deleting resume:', error);
                alert('Failed to delete resume');
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-logo">
                    Nexume<span>.</span>
                </div>
                <div className="user-profile">
                    <span className="user-greeting">Hi, {userName}</span>
                    <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                        <LogOut size={16} style={{ marginRight: '8px' }} /> Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-content">
                <h1 className="dashboard-title">What would you like to do?</h1>

                <div className="action-cards">
                    <div className="action-card" onClick={() => setIsModalOpen(true)}>
                        <div className="icon-wrapper create-icon">
                            <Plus size={32} />
                        </div>
                        <span className="card-text">Create Resume</span>
                    </div>

                    <div className="action-card" onClick={() => setIsUploadModalOpen(true)}>
                        <div className="icon-wrapper upload-icon">
                            <Upload size={32} />
                        </div>
                        <span className="card-text">Upload Existing</span>
                    </div>
                </div>

                <div className="resumes-section">
                    <h2 className="section-header">My Resumes</h2>
                    {resumes.length === 0 ? (
                        <div className="empty-state">
                            <FileText size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <p>You haven't created any resumes yet.</p>
                            <p style={{ fontSize: '14px', marginTop: '8px' }}>Start by creating a new one or uploading an existing resume.</p>
                        </div>
                    ) : (
                        <div className="resumes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            {resumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="resume-card"
                                    onClick={() => navigate(`/resume/${resume.id}/edit`)}
                                    style={{
                                        backgroundColor: 'var(--bg-light)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        position: 'relative'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '8px',
                                            backgroundColor: 'rgba(217, 70, 239, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#d946ef'
                                        }}>
                                            <FileText size={20} />
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteResume(e, resume.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#ef4444',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            title="Delete Resume"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                                            {resume.title || 'Untitled Resume'}
                                        </h3>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                            {resume.fullName || 'No Name'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <CreateResumeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateResume}
            />

            <UploadResumeModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUpload={handleUploadResume}
            />
        </div>
    );
};

export default Dashboard;
