import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, LayoutTemplate, LogOut, EyeOff, Eye, Share2 } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import SummaryForm from '../components/SummaryForm';
import SkillsForm from '../components/SkillsForm';
import ExperienceForm from '../components/ExperienceForm';
import AchievementsForm from '../components/AchievementsForm';
import ProjectsForm from '../components/ProjectsForm';
import EducationForm from '../components/EducationForm';
import CertificationsForm from '../components/CertificationsForm';
import ResumePreview from '../components/ResumePreview';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('User');
    const [resumeData, setResumeData] = useState({
        fullName: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        themeColor: '#00008b',
        profession: '',
        linkedin: '',
        website: '',
        leetcode: '',
        geeksforgeeks: '',
        github: '',
        summary: '',
        skills: [],
        experience: [],
        achievements: [],
        projects: [],
        education: [],
        certifications: []
    });
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [isPublic, setIsPublic] = useState(false);
    const resumePreviewRef = useRef();

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
        fetchResumeData();
    }, [id]);

    const fetchResumeData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/resumes/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setResumeData(data);
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    useEffect(() => {
        const saveResume = async () => {
            if (!id) return;
            try {
                const token = localStorage.getItem('token');
                await fetch(`/api/resumes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(resumeData)
                });
            } catch (error) {
                console.error('Error saving resume:', error);
            }
        };

        const timeoutId = setTimeout(() => {
            if (resumeData.fullName) { // Only save if there's some data
                saveResume();
            }
        }, 1000); // Debounce save

        return () => clearTimeout(timeoutId);
    }, [resumeData, id]);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        navigate('/auth/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        setActiveFormIndex(prev => prev + 1);
    };

    const handlePrevious = () => {
        setActiveFormIndex(prev => prev - 1);
    };

    const handleDownload = useReactToPrint({
        contentRef: resumePreviewRef,
        documentTitle: resumeData.fullName || 'Resume',
        onAfterPrint: () => console.log('Print success'),
        onPrintError: (error) => console.error('Print error:', error),
    });

    const handleShare = async () => {
        const url = `${window.location.origin}/my-resume/${id}/view`;
        try {
            await navigator.clipboard.writeText(url);
            alert("Public link copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="resume-builder-container">
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

            <div className="builder-sub-header">
                <Link to="/dashboard" className="back-btn">
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Dashboard
                </Link>
                <div className="header-actions">
                    {!isPublic ? (
                        <button
                            className="btn btn-sm"
                            onClick={() => setIsPublic(true)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: 'rgba(217, 70, 239, 0.1)',
                                color: '#d946ef',
                                border: 'none'
                            }}
                        >
                            <EyeOff size={14} /> Private
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                className="btn btn-sm"
                                onClick={handleShare}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    backgroundColor: '#dbeafe',
                                    color: '#2563eb',
                                    border: 'none'
                                }}
                            >
                                <Share2 size={14} /> Share
                            </button>
                            <button
                                className="btn btn-sm"
                                onClick={() => setIsPublic(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    backgroundColor: '#f3e8ff',
                                    color: '#9333ea',
                                    border: 'none'
                                }}
                            >
                                <Eye size={14} /> Public
                            </button>
                        </div>
                    )}
                    <button className="btn btn-success btn-sm" onClick={handleDownload}>
                        <Download size={16} style={{ marginRight: '8px' }} /> Download
                    </button>
                </div>
            </div>

            <main className="builder-main">
                <div className="builder-form-section">
                    {activeFormIndex === 0 && (
                        <PersonalDetailsForm
                            resumeData={resumeData}
                            handleInputChange={handleInputChange}
                            handleNext={handleNext}
                        />
                    )}
                    {activeFormIndex === 1 && (
                        <SummaryForm
                            resumeData={resumeData}
                            handleInputChange={handleInputChange}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 2 && (
                        <SkillsForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 3 && (
                        <ExperienceForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 4 && (
                        <AchievementsForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 5 && (
                        <ProjectsForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 6 && (
                        <EducationForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                        />
                    )}
                    {activeFormIndex === 7 && (
                        <CertificationsForm
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            handleFinish={async () => {
                                try {
                                    const token = localStorage.getItem('token');
                                    await fetch(`/api/resumes/${id}`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify(resumeData)
                                    });
                                    navigate('/dashboard');
                                } catch (error) {
                                    console.error('Error finishing resume:', error);
                                    alert('Failed to save resume');
                                }
                            }}
                        />
                    )}
                </div>
                <div className="builder-preview-section">
                    <ResumePreview resumeData={resumeData} ref={resumePreviewRef} />
                </div>
            </main>
        </div>
    );
};

export default ResumeBuilder;
