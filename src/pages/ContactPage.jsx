import React from 'react';
import './ContactPage.css'; // We will create this file next

const ContactPage = () => {
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
                    {/* Left Column: Info and Map */}
                    <div className="contact-info">
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

                        {/* This is the placeholder for your Google Map */}
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.0471114944!2d73.7929269477685!3d18.52456488734268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1671536173738!5m2!1sen!2sin"
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

                    {/* Right Column: Contact Form */}
                    <div className="contact-form-section">
                        <h2>Send Us a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select id="subject" name="subject">
                                    <option>General Inquiry</option>
                                    <option>Custom Cake Order</option>
                                    <option>Feedback & Suggestions</option>
                                    <option>Catering Request</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="6" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

