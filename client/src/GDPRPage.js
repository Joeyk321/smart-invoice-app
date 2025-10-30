import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function GDPRPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>GDPR Compliance</h1>
          <p className="page-subtitle">
            Your privacy and data protection rights under the General Data Protection Regulation
          </p>
        </div>

        <div className="legal-sections">
          <section className="legal-section">
            <div className="section-icon">
              <Shield size={32} />
            </div>
            <h2>Data Protection Rights</h2>
            <p>
              Under GDPR, you have the following rights regarding your personal data:
            </p>
            <ul className="rights-list">
              <li><strong>Right to Access:</strong> You can request a copy of all personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> You can request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> You can request deletion of your personal data in certain circumstances</li>
              <li><strong>Right to Restrict Processing:</strong> You can request limitation of how we process your data</li>
              <li><strong>Right to Data Portability:</strong> You can request your data in a structured, machine-readable format</li>
              <li><strong>Right to Object:</strong> You can object to processing of your data for certain purposes</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="section-icon">
              <Database size={32} />
            </div>
            <h2>Data We Collect</h2>
            <p>We collect and process the following categories of personal data:</p>
            <div className="data-categories">
              <div className="data-category">
                <h4>Account Information</h4>
                <ul>
                  <li>Name and email address</li>
                  <li>Company information</li>
                  <li>Billing address</li>
                  <li>Phone number (optional)</li>
                </ul>
              </div>
              <div className="data-category">
                <h4>Financial Data</h4>
                <ul>
                  <li>Invoice data</li>
                  <li>Expense information</li>
                  <li>Payment records</li>
                  <li>Tax information</li>
                </ul>
              </div>
              <div className="data-category">
                <h4>Usage Data</h4>
                <ul>
                  <li>Login information</li>
                  <li>Feature usage</li>
                  <li>Device information</li>
                  <li>IP address</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <div className="section-icon">
              <Lock size={32} />
            </div>
            <h2>Data Security</h2>
            <p>We implement comprehensive security measures to protect your data:</p>
            <div className="security-measures">
              <div className="security-item">
                <h4>Encryption</h4>
                <p>All data is encrypted in transit and at rest using industry-standard encryption protocols</p>
              </div>
              <div className="security-item">
                <h4>Access Controls</h4>
                <p>Strict access controls ensure only authorized personnel can access your data</p>
              </div>
              <div className="security-item">
                <h4>Regular Audits</h4>
                <p>We conduct regular security audits and penetration testing</p>
              </div>
              <div className="security-item">
                <h4>Data Minimization</h4>
                <p>We only collect and process data that is necessary for our services</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <div className="section-icon">
              <Eye size={32} />
            </div>
            <h2>Data Processing Lawful Basis</h2>
            <p>We process your personal data under the following lawful bases:</p>
            <ul className="basis-list">
              <li><strong>Contract Performance:</strong> To provide our invoicing and expense tracking services</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Consent:</strong> For marketing communications (where you have opted in)</li>
              <li><strong>Legal Obligation:</strong> To comply with tax and accounting regulations</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="section-icon">
              <UserCheck size={32} />
            </div>
            <h2>Your Rights & How to Exercise Them</h2>
            <p>To exercise any of your GDPR rights, please contact us:</p>
            <div className="contact-methods">
              <div className="contact-method">
                <h4>Email</h4>
                <p>privacy@quickinvoice.com</p>
              </div>
              <div className="contact-method">
                <h4>Data Protection Officer</h4>
                <p>dpo@quickinvoice.com</p>
              </div>
              <div className="contact-method">
                <h4>Response Time</h4>
                <p>We will respond to your request within 30 days</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <div className="section-icon">
              <AlertTriangle size={32} />
            </div>
            <h2>Data Breach Notification</h2>
            <p>
              In the unlikely event of a data breach that affects your personal data, we will:
            </p>
            <ul className="breach-procedures">
              <li>Notify you within 72 hours of becoming aware of the breach</li>
              <li>Provide details of what data was affected</li>
              <li>Explain the measures we are taking to address the breach</li>
              <li>Advise you on steps you can take to protect yourself</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Data Retention</h2>
            <p>We retain your personal data for the following periods:</p>
            <div className="retention-periods">
              <div className="retention-item">
                <h4>Account Data</h4>
                <p>Retained for the duration of your account plus 7 years for legal compliance</p>
              </div>
              <div className="retention-item">
                <h4>Financial Records</h4>
                <p>Retained for 7 years as required by tax regulations</p>
              </div>
              <div className="retention-item">
                <h4>Usage Data</h4>
                <p>Retained for 2 years for analytics and service improvement</p>
              </div>
            </div>
          </section>

          <section className="legal-section">
            <h2>Third-Party Data Sharing</h2>
            <p>We may share your data with the following third parties:</p>
            <ul className="third-parties">
              <li><strong>Payment Processors:</strong> To process payments (Stripe, PayPal)</li>
              <li><strong>Cloud Providers:</strong> For secure data storage (AWS, Google Cloud)</li>
              <li><strong>Analytics Services:</strong> For service improvement (anonymized data only)</li>
              <li><strong>Legal Authorities:</strong> When required by law or court order</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>Updates to This Policy</h2>
            <p>
              We may update this GDPR policy from time to time. We will notify you of any 
              significant changes via email or through our service. Your continued use of 
              our service after such changes constitutes acceptance of the updated policy.
            </p>
            <p><strong>Last Updated:</strong> January 15, 2024</p>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default GDPRPage;
