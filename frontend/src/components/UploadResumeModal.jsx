import React, { useState, useRef } from 'react';
import { X, CloudUpload, Loader2 } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfUtils';
import { parseResumeWithAI } from '../service/AIModal';
import './UploadResumeModal.css';

const UploadResumeModal = ({ isOpen, onClose, onUpload }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async () => {
        if (title && file) {
            setIsLoading(true);
            try {
                let parsedData = {};
                if (file.type === 'application/pdf') {
                    const text = await extractTextFromPDF(file);
                    parsedData = await parseResumeWithAI(text);
                }
                // Add support for other file types here if needed

                onUpload(title, file, parsedData);
                setTitle('');
                setFile(null);
            } catch (error) {
                console.error('Error parsing resume:', error);
                alert(`Failed to parse resume: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Upload Resume</h2>
                    <button className="close-btn" onClick={onClose} disabled={isLoading}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="input-group">
                        <input
                            type="text"
                            className="modal-input"
                            placeholder="Enter resume title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Select resume file (PDF)</label>
                        <div
                            className={`upload-area ${isLoading ? 'disabled' : ''}`}
                            onClick={() => !isLoading && fileInputRef.current.click()}
                            onDrop={!isLoading ? handleDrop : undefined}
                            onDragOver={!isLoading ? handleDragOver : undefined}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                accept=".pdf"
                                disabled={isLoading}
                            />
                            {isLoading ? (
                                <Loader2 size={40} className="animate-spin" color="#9ca3af" />
                            ) : (
                                <CloudUpload size={40} color="#9ca3af" />
                            )}
                            <span className="upload-text">
                                {isLoading ? "Parsing resume..." : (file ? file.name : "Upload resume")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn-upload"
                        onClick={handleSubmit}
                        disabled={!title || !file || isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Upload Resume'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadResumeModal;
