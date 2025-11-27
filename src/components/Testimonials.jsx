import React from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import './Testimonials.css';

const testimonialsData = [
    {
        id: 1,
        name: 'Avery Johnson',
        handle: '@averywrites',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
        id: 2,
        name: 'Briar Martin',
        handle: '@neilstellar',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
        id: 3,
        name: 'Avery Johnson',
        handle: '@averywrites',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
        id: 4,
        name: 'Briar Martin',
        handle: '@neilstellar',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
        id: 5,
        name: 'Avery Johnson',
        handle: '@averywrites',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
    {
        id: 6,
        name: 'Jordan Lee',
        handle: '@jordantalks',
        image: 'https://randomuser.me/api/portraits/men/86.jpg',
        text: 'Radiant made undercutting all of our competitors an absolute breeze.',
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <div className="testimonials-header">
                    <div className="testimonials-badge">
                        <MessageSquare size={14} fill="currentColor" /> Testimonials
                    </div>
                    <h2 className="testimonials-headline">Don't just take our words</h2>
                    <p className="testimonials-subheadline">
                        Hear what our users say about us. We're always looking for ways to improve. If you
                        have a positive experience with us, leave a review.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.map((item) => (
                        <div key={item.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={item.image} alt={item.name} className="testimonial-avatar" />
                                <div className="testimonial-info">
                                    <div className="testimonial-name-row">
                                        <span className="testimonial-name">{item.name}</span>
                                        <CheckCircle2 size={14} className="verified-icon" />
                                    </div>
                                    <span className="testimonial-handle">{item.handle}</span>
                                </div>
                            </div>
                            <p className="testimonial-text">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
