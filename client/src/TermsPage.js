import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function TermsPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>Terms of Service</h1>
          <p className="page-subtitle">
            Please read these terms carefully before using QuickInvoice.
          </p>
          <div className="last-updated">
            Last updated: January 1, 2025
          </div>
        </div>

        <div className="terms-sections">
          {/* Agreement */}
          <section className="terms-section">
            <div className="section-icon">
              <FileText size={32} />
            </div>
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using QuickInvoice, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          {/* Service Description */}
          <section className="terms-section">
            <div className="section-icon">
              <Scale size={32} />
            </div>
            <h2>Service Description</h2>
            <p>
              QuickInvoice provides cloud-based invoicing and expense tracking services. Our platform allows users to create, 
              send, and manage invoices, track expenses, and generate financial reports.
            </p>
            <h3>Features Include:</h3>
            <ul>
              <li>Invoice creation and management</li>
              <li>AI-powered receipt scanning</li>
              <li>Expense tracking and categorization</li>
              <li>Payment processing integration</li>
              <li>Financial reporting and analytics</li>
              <li>Client management tools</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="terms-section">
            <div className="section-icon">
              <CheckCircle size={32} />
            </div>
            <h2>User Responsibilities</h2>
            <p>As a user of QuickInvoice, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information when creating your account</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the intellectual property rights of others</li>
            </ul>
          </section>

          {/* Prohibited Uses */}
          <section className="terms-section">
            <div className="section-icon">
              <AlertTriangle size={32} />
            </div>
            <h2>Prohibited Uses</h2>
            <p>You may not use our service:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section className="terms-section">
            <h2>Payment Terms</h2>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as 
              required by law. You may cancel your subscription at any time, and your access will continue until the end 
              of your current billing period.
            </p>
            <h3>Pricing Changes</h3>
            <p>
              We reserve the right to modify our pricing with 30 days' notice. Price changes will not affect your current 
              billing period but will apply to subsequent renewals.
            </p>
          </section>

          {/* Data and Privacy */}
          <section className="terms-section">
            <h2>Data and Privacy</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information in connection with the 
              service is described in our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
            <h3>Data Ownership</h3>
            <p>
              You retain ownership of all data you input into the service. We will not use your data for any purpose 
              other than providing the service, except as described in our Privacy Policy.
            </p>
          </section>

          {/* Service Availability */}
          <section className="terms-section">
            <h2>Service Availability</h2>
            <p>
              We strive to maintain high service availability but cannot guarantee uninterrupted access. We may 
              temporarily suspend the service for maintenance, updates, or other operational reasons.
            </p>
            <h3>Uptime Commitment</h3>
            <p>
              We aim to maintain 99.9% uptime but do not guarantee specific availability levels. Service interruptions 
              due to circumstances beyond our control are not considered downtime.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="terms-section">
            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, QuickInvoice shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including without limitation, loss of profits, data, use, 
              goodwill, or other intangible losses.
            </p>
          </section>

          {/* Termination */}
          <section className="terms-section">
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
              whatsoever, including without limitation if you breach the Terms.
            </p>
            <h3>Effect of Termination</h3>
            <p>
              Upon termination, your right to use the service will cease immediately. We will provide you with a 
              reasonable opportunity to export your data before account deletion.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="terms-section">
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </section>

          {/* Contact Information */}
          <section className="terms-section">
            <h2>Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@quickinvoice.com</p>
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

export default TermsPage;