import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import ResumePreview from '../components/ResumePreview';

const ViewResume = () => {
    const { id } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const resumePreviewRef = useRef();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/public/resumes/${id}`);
                if (!response.ok) {
                    throw new Error('Resume not found');
                }
                const data = await response.json();
                setResumeData(data);
            } catch (err) {
                console.error('Error fetching resume:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchResume();
        }
    }, [id]);

    const handleDownload = useReactToPrint({
        contentRef: resumePreviewRef,
        documentTitle: resumeData?.fullName || 'Resume',
    });

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Resume Not Found</h2>
                <p>The resume you are looking for does not exist or has been removed.</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                    Go Home
                </Link>
            </div>
        );
    }

    return (
        <div className="resume-builder-container">
            <header className="dashboard-header">
                <div className="dashboard-logo">
                    Nexume<span>.</span>
                </div>
                <div className="header-actions">
                    <button className="btn btn-success btn-sm" onClick={handleDownload}>
                        <Download size={16} style={{ marginRight: '8px' }} /> Download
                    </button>
                </div>
            </header>

            <main className="builder-main" style={{ justifyContent: 'center' }}>
                <div className="builder-preview-section" style={{ width: '100%', maxWidth: '800px' }}>
                    <ResumePreview resumeData={resumeData} ref={resumePreviewRef} />
                </div>
            </main>
        </div>
    );
};

export default ViewResume;
