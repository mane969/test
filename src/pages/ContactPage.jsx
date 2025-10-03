import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
    // --- NEW: State to manage form inputs ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    // --- NEW: State to manage submission status for user feedback ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // Can be 'success', 'error', or null

    // --- NEW: A single handler to update state for any input change ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // --- NEW: Function to handle form submission ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default browser refresh
        setIsSubmitting(true);
        setSubmissionStatus(null);

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong on the server.');
            }

            setSubmissionStatus('success');
            // Reset form after successful submission
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });

        } catch (error) {
            console.error('Submission Error:', error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-content">
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Get in Touch With Us!</h1>
                    <p>
                        We'd love to hear from you. Whether you have a question, a special request for a custom cake,
                        or just want to say hello, here's how you can reach us.
                    </p>
                </div>

                <div className="contact-body">
                    <div className="contact-info">
                        {/* ... (Your existing info and map section is unchanged) ... */}
                        <h2>Visit Our Bakery</h2>
                        <p>
                            <strong>Delicia</strong><br />
                            123, Sweet Lane,<br />
                            Koregaon Park, Pune, Maharashtra - 411001
                        </p>
                        <h3>Our Hours</h3>
                        <ul>
                            <li><strong>Monday - Friday:</strong> 8:00 AM - 7:00 PM</li>
                            <li><strong>Saturday:</strong> 9:00 AM - 6:00 PM</li>
                            <li><strong>Sunday:</strong> Closed</li>
                        </ul>
                        <h3>Talk to Us</h3>
                        <p>
                            📞 Phone: <a href="tel:+919876543210">+91 12345 67890</a>
                        </p>
                        <p>
                            📧 Email: <a href="mailto:orders@yourbakeryname.com">orders@delicia.com</a>
                        </p>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.951543883017!2d73.90412921535456!3d18.53100187363435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c126488b49e3%3A0x941a37c35e5b562a!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1671092500000!5m2!1sen!2sin"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Bakery Location">
                            </iframe>
                        </div>
                    </div>
                    
                    <div className="contact-form-section">
                        <h2>Send Us a Message</h2>
                        {/* Add the onSubmit handler to the form */}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                                    <option>General Inquiry</option>
                                    <option>Custom Cake Order</option>
                                    <option>Feedback & Suggestions</option>
                                    <option>Catering Request</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            
                            <button type="submit" className="btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                        
                        {/* --- NEW: User feedback messages --- */}
                        {submissionStatus === 'success' && (
                            <div className="form-feedback success">
                                <p>✅ Thank you! Your message has been sent successfully.</p>
                            </div>
                        )}
                        {submissionStatus === 'error' && (
                            <div className="form-feedback error">
                                <p>❌ Something went wrong. Please try again later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;