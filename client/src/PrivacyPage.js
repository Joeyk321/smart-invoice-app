import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function PrivacyPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>Privacy Policy</h1>
          <p className="page-subtitle">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="last-updated">
            Last updated: January 1, 2025
          </div>
        </div>

        <div className="privacy-sections">
          {/* Introduction */}
          <section className="privacy-section">
            <div className="section-icon">
              <Shield size={32} />
            </div>
            <h2>Introduction</h2>
            <p>
              QuickInvoice ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="privacy-section">
            <div className="section-icon">
              <Database size={32} />
            </div>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Business information (company name, address, tax ID)</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Account credentials and preferences</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>How you use our service and features</li>
              <li>Device information and IP address</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our platform</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="privacy-section">
            <div className="section-icon">
              <Eye size={32} />
            </div>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze usage patterns</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section className="privacy-section">
            <div className="section-icon">
              <Lock size={32} />
            </div>
            <h2>Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
            
            <h3>Service Providers</h3>
            <p>We may share your information with trusted third-party service providers who assist us in operating our platform, conducting our business, or serving our users.</p>

            <h3>Legal Requirements</h3>
            <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

            <h3>Business Transfers</h3>
            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>
          </section>

          {/* Data Security */}
          <section className="privacy-section">
            <div className="section-icon">
              <UserCheck size={32} />
            </div>
            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3>Security Measures</h3>
            <ul>
              <li>256-bit SSL encryption for data transmission</li>
              <li>Encrypted data storage</li>
              <li>Regular security audits and assessments</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="privacy-section">
            <h2>Your Rights and Choices</h2>
            <p>You have certain rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@quickinvoice.com</p>
              <p><strong>Address:</strong> 123 Innovation Street, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default PrivacyPage;