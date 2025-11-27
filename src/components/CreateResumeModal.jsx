import React, { useState } from 'react';
import { X } from 'lucide-react';
import './CreateResumeModal.css';

const CreateResumeModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onCreate(title);
            setTitle('');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Create a Resume</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <input
                            type="text"
                            placeholder="Enter resume title"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!title.trim()}
                        >
                            Create Resume
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateResumeModal;
