import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Code, Terminal, Github } from 'lucide-react';

const ResumePreview = forwardRef(({ resumeData }, ref) => {
    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const renderWithHighlight = (text) => {
        if (!text) return null;
        // Split by * to find parts to highlight
        const parts = text.split('*');
        return parts.map((part, index) => {
            // Odd indices are the ones inside asterisks
            if (index % 2 === 1) {
                return <span key={index} style={{ fontWeight: 'bold' }}>{part}</span>;
            }
            return part;
        });
    };

    return (
        <div ref={ref} className="resume-preview-paper" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            <div className="preview-header">
                <h1 className="preview-name">
                    {resumeData.fullName || 'Your Name'}
                </h1>


                {resumeData.address && (
                    <div className="preview-address" style={{ textAlign: 'center', marginBottom: '12px', fontSize: '13px', color: '#666' }}>
                        <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        {resumeData.address}
                    </div>
                )}

                <div className="preview-contact">
                    {resumeData.email && (
                        <div className="contact-item">
                            <Mail size={14} />
                            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
                        </div>
                    )}
                    {resumeData.phone && (
                        <div className="contact-item">
                            <Phone size={14} /> <span>{resumeData.phone}</span>
                        </div>
                    )}
                    {resumeData.linkedin && (
                        <div className="contact-item">
                            <Linkedin size={14} />
                            <a href={formatUrl(resumeData.linkedin)} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    )}
                    {resumeData.github && (
                        <div className="contact-item">
                            <Github size={14} />
                            <a href={formatUrl(resumeData.github)} target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    )}
                    {resumeData.website && (
                        <div className="contact-item">
                            <Globe size={14} />
                            <a href={formatUrl(resumeData.website)} target="_blank" rel="noopener noreferrer">Portfolio</a>
                        </div>
                    )}
                    {resumeData.leetcode && (
                        <div className="contact-item">
                            <Code size={14} />
                            <a href={formatUrl(resumeData.leetcode)} target="_blank" rel="noopener noreferrer">LeetCode</a>
                        </div>
                    )}
                    {resumeData.geeksforgeeks && (
                        <div className="contact-item">
                            <Terminal size={14} />
                            <a href={formatUrl(resumeData.geeksforgeeks)} target="_blank" rel="noopener noreferrer">GeeksForGeeks</a>
                        </div>
                    )}
                </div>

                <div className="preview-divider"></div>
            </div>

            {/* Removed the HR since we have a custom divider now */}

            {/* Placeholder for other sections */}
            {/* Summary Section */}
            {resumeData.summary && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>PROFILE SUMMARY</h2>
                    <p className="preview-summary" style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', color: '#000000' }}>
                        {renderWithHighlight(resumeData.summary)}
                    </p>
                </div>
            )}

            {/* Skills Section */}
            {resumeData.skills && resumeData.skills.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>TECHNICAL SKILLS</h2>
                    <div className="preview-skills-grid" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
                        {resumeData.skills.map((skill, index) => (
                            skill.skills && (
                                <div key={index} style={{ fontSize: '13px', color: '#000000' }}>
                                    <span style={{ fontWeight: 'bold' }}>{skill.title}:</span> <span>{renderWithHighlight(skill.skills)}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Section */}
            {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>EXPERIENCE</h2>

                    {resumeData.experience.map((exp, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
                                    {exp.companyName} {exp.city && `(${exp.city})`}
                                </h3>
                                <span style={{ fontSize: '12px', color: '#000000' }}>
                                    {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ' - Present'}
                                </span>
                            </div>
                            <div style={{ marginBottom: '6px' }}>
                                <span style={{ fontSize: '13px', fontStyle: 'italic', color: '#000000' }}>
                                    {exp.title}
                                </span>
                            </div>
                            <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#000000', whiteSpace: 'pre-line' }}>
                                {renderWithHighlight(exp.workSummary)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Achievements Section */}
            {resumeData.achievements && resumeData.achievements.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>ACHIEVEMENTS</h2>
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {resumeData.achievements.map((achievement, index) => (
                            <li key={index} style={{ fontSize: '13px', lineHeight: '1.5', color: '#000000', marginBottom: '4px' }}>
                                {renderWithHighlight(achievement)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Projects Section */}
            {resumeData.projects && resumeData.projects.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>PROJECTS</h2>

                    {resumeData.projects.map((project, index) => (
                        <div key={index} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
                                    {project.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
                                    {project.githubLink && (
                                        <a href={formatUrl(project.githubLink)} target="_blank" rel="noopener noreferrer" style={{ color: resumeData.themeColor, fontWeight: 'bold', textDecoration: 'none' }}>GITHUB</a>
                                    )}
                                    {project.liveLink && (
                                        <>
                                            <span style={{ color: '#000000' }}>—</span>
                                            <a href={formatUrl(project.liveLink)} target="_blank" rel="noopener noreferrer" style={{ color: resumeData.themeColor, fontWeight: 'bold', textDecoration: 'none' }}>LIVE</a>
                                        </>
                                    )}
                                    {project.demoLink && (
                                        <>
                                            <span style={{ color: '#000000' }}>—</span>
                                            <a href={formatUrl(project.demoLink)} target="_blank" rel="noopener noreferrer" style={{ color: resumeData.themeColor, fontWeight: 'bold', textDecoration: 'none' }}>DEMO</a>
                                        </>
                                    )}
                                </div>
                            </div>
                            {project.techStack && (
                                <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#000000', marginBottom: '4px' }}>
                                    - {renderWithHighlight(project.techStack)}
                                </div>
                            )}
                            <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#000000', whiteSpace: 'pre-line' }}>
                                {renderWithHighlight(project.description)}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Education Section */}
            {resumeData.education && resumeData.education.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>EDUCATION</h2>

                    {resumeData.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#000000' }}>
                                    {edu.institution}
                                </h3>
                                <span style={{ fontSize: '12px', color: '#000000' }}>
                                    {edu.startDate} - {edu.endDate}
                                </span>
                            </div>
                            <div style={{ fontSize: '13px', color: '#000000' }}>
                                {edu.degree} {edu.grade}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications Section */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div className="preview-section">
                    <h2 className="preview-section-title" style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: resumeData.themeColor
                    }}>CERTIFICATIONS</h2>
                    <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        {resumeData.certifications.map((cert, index) => {
                            // Simple parser for [Link Text](url)
                            const parts = cert.split(/(\[.*?\]\(.*?\))/g);
                            return (
                                <li key={index} style={{ fontSize: '13px', lineHeight: '1.5', color: '#000000', marginBottom: '4px' }}>
                                    {parts.map((part, i) => {
                                        const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
                                        if (match) {
                                            return <a key={i} href={formatUrl(match[2])} target="_blank" rel="noopener noreferrer" style={{ color: resumeData.themeColor, textDecoration: 'underline' }}>{match[1]}</a>;
                                        }
                                        return renderWithHighlight(part);
                                    })}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default ResumePreview;
