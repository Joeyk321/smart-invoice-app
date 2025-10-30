import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Clock, Globe, Smartphone } from 'lucide-react';

function Footer({ onNavigateToPage }) {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="footer-section main-section">
          <div className="footer-logo">
            <Sparkles size={28} />
            <span>QuickInvoice</span>
          </div>
          <p>Streamline your invoicing with AI-powered automation. Create, send, and track invoices effortlessly.</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <Globe size={20} />
            </a>
            <a href="#" className="social-link">
              <Mail size={20} />
            </a>
            <a href="#" className="social-link">
              <Smartphone size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Product</h4>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        
        <div className="footer-section">
          <h4>Resources</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('help'); }}>Help Center</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('status'); }}>Status & Features</a>
        </div>
        
        <div className="footer-section">
          <h4>Company</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('contact'); }}>Contact</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('help'); }}>Support</a>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('privacy'); }}>Privacy Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('terms'); }}>Terms of Service</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToPage('gdpr'); }}>GDPR</a>
          <a href="#">Security</a>
          <a href="#">Compliance</a>
        </div>
        
        <div className="footer-section contact-section">
          <h4>Contact Info</h4>
          <div className="contact-item">
            <Mail size={16} />
            <span>support@quickinvoice.com</span>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
          <div className="contact-item">
            <Clock size={16} />
            <span>Mon-Fri 9AM-6PM PST</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 QuickInvoice. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
