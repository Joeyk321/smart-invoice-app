import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Sparkles, Globe, Shield, Award, Zap } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function ContactPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I get started with QuickInvoice?",
      answer: "Simply sign up for a free account and start creating invoices immediately. No credit card required for the free trial. You can create up to 5 invoices per month on the free plan."
    },
    {
      id: 2,
      question: "Is my financial data secure?",
      answer: "Yes! We use bank-level 256-bit SSL encryption and security measures to protect your financial data. Your privacy is our priority and we're SOC 2 compliant."
    },
    {
      id: 3,
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no cancellation fees or hidden charges. Your data remains accessible for 30 days after cancellation."
    },
    {
      id: 4,
      question: "What integrations do you offer?",
      answer: "We integrate with popular accounting software like QuickBooks, Xero, and FreshBooks, plus payment processors like Stripe, PayPal, and Square."
    },
    {
      id: 5,
      question: "How does the AI receipt scanning work?",
      answer: "Our AI uses advanced computer vision to extract vendor, amount, date, and category from receipt photos with 99.9% accuracy. It learns from your patterns over time."
    },
    {
      id: 6,
      question: "Do you offer customer support?",
      answer: "Yes! We provide 24/7 email support, live chat during business hours, and phone support for premium customers. Response time is typically under 2 hours."
    },
    {
      id: 7,
      question: "Can I customize invoice templates?",
      answer: "Absolutely! We offer 20+ professional templates that you can fully customize with your logo, colors, fonts, and branding elements."
    },
    {
      id: 8,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through Stripe."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="contact-page">
      {/* Navigation */}
      <Navigation 
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="contact-hero-content">
          <div className="hero-badge">
            <MessageCircle size={16} />
            <span>We're Here to Help</span>
          </div>
          <h1>Get in Touch</h1>
          <p>Have questions? Need support? We're here to help you succeed with QuickInvoice. Reach out to our team anytime.</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            <div className="contact-method-card">
              <div className="method-icon">
                <Mail size={32} />
              </div>
              <h3>Email Support</h3>
              <p>support@quickinvoice.com</p>
              <span className="method-subtitle">24/7 Response</span>
            </div>

            <div className="contact-method-card">
              <div className="method-icon">
                <Phone size={32} />
              </div>
              <h3>Phone Support</h3>
              <p>+1 (555) 123-4567</p>
              <span className="method-subtitle">Mon-Fri 9AM-6PM PST</span>
            </div>

            <div className="contact-method-card">
              <div className="method-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Live Chat</h3>
              <p>Available 24/7</p>
              <span className="method-subtitle">Instant Help</span>
            </div>

            <div className="contact-method-card">
              <div className="method-icon">
                <MapPin size={32} />
              </div>
              <h3>Visit Us</h3>
              <p>San Francisco, CA</p>
              <span className="method-subtitle">By Appointment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-column">
              {faqs.slice(0, 4).map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question" 
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <h3>{faq.question}</h3>
                    <div className={`faq-icon ${openFAQ === faq.id ? 'open' : ''}`}>
                      <span>+</span>
                    </div>
                  </div>
                  <div className={`faq-answer ${openFAQ === faq.id ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="faq-column">
              {faqs.slice(4, 8).map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className="faq-question" 
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <h3>{faq.question}</h3>
                    <div className={`faq-icon ${openFAQ === faq.id ? 'open' : ''}`}>
                      <span>+</span>
                    </div>
                  </div>
                  <div className={`faq-answer ${openFAQ === faq.id ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default ContactPage;
