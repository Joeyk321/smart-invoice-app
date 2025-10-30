import React from 'react';
import { ArrowLeft, Users, Target, Award, Heart, Globe, Zap } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function AboutPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
          <div className="page-hero">
            <h1>About QuickInvoice</h1>
            <p className="page-subtitle">
              We're revolutionizing how freelancers and small businesses manage their finances with AI-powered tools.
            </p>
          </div>

          <div className="about-sections">
            {/* Mission Section */}
            <section className="about-section">
              <div className="section-icon">
                <Target size={32} />
              </div>
              <h2>Our Mission</h2>
              <p>
                To empower entrepreneurs, freelancers, and small business owners with intelligent tools that simplify 
                financial management, so they can focus on what they do best - growing their business.
              </p>
            </section>

            {/* Story Section */}
            <section className="about-section">
              <div className="section-icon">
                <Heart size={32} />
              </div>
              <h2>Our Story</h2>
              <p>
                QuickInvoice was born from the frustration of managing invoices and expenses manually. Our founders, 
                experienced entrepreneurs themselves, knew there had to be a better way. We combined cutting-edge AI 
                technology with intuitive design to create a solution that actually works for real businesses.
              </p>
            </section>

            {/* Values Section */}
            <section className="about-section">
              <div className="section-icon">
                <Award size={32} />
              </div>
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>Innovation</h3>
                  <p>We constantly push the boundaries of what's possible with AI and automation.</p>
                </div>
                <div className="value-item">
                  <h3>Simplicity</h3>
                  <p>Complex problems deserve simple solutions. We make the complex feel effortless.</p>
                </div>
                <div className="value-item">
                  <h3>Trust</h3>
                  <p>Your financial data is sacred. We protect it with bank-level security.</p>
                </div>
                <div className="value-item">
                  <h3>Growth</h3>
                  <p>We're here to help you grow, not just manage. Every feature is designed for scale.</p>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section className="about-section">
              <div className="section-icon">
                <Users size={32} />
              </div>
              <h2>Our Team</h2>
              <p>
                We're a diverse team of engineers, designers, and business experts who are passionate about 
                solving real problems for real people. Based in San Francisco, we work remotely across the globe.
              </p>
              <div className="team-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Team Members</p>
                </div>
                <div className="stat">
                  <h3>15+</h3>
                  <p>Countries</p>
                </div>
                <div className="stat">
                  <h3>5+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="about-section">
              <div className="section-icon">
                <Globe size={32} />
              </div>
              <h2>Our Impact</h2>
              <p>
                Since our launch, we've helped thousands of businesses save time and money. Our users have 
                processed over $50 million in invoices and saved countless hours on manual data entry.
              </p>
              <div className="impact-stats">
                <div className="impact-item">
                  <Zap size={24} />
                  <div>
                    <h4>10,000+ Hours Saved</h4>
                    <p>Time saved on manual invoice processing</p>
                  </div>
                </div>
                <div className="impact-item">
                  <Zap size={24} />
                  <div>
                    <h4>$50M+ Processed</h4>
                    <p>Total invoice value processed through our platform</p>
                  </div>
                </div>
                <div className="impact-item">
                  <Zap size={24} />
                  <div>
                    <h4>99.9% Accuracy</h4>
                    <p>AI-powered receipt scanning accuracy rate</p>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default AboutPage;
