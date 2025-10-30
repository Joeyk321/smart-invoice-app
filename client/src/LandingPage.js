import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, Shield, TrendingUp, Check, Sparkles, DollarSign, FileText, Star, Users, Clock, Award, Globe, Lock, Smartphone, Mail, Phone, MapPin, Receipt, Download, BarChart3, CreditCard, Bot, Brain, Rocket, TrendingDown } from 'lucide-react';

function LandingPage({ onGetStarted, onNavigateToLogin, onNavigateToPage, onNavigateToSignup }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const features = [
    {
      icon: <Receipt size={48} />,
      title: "AI Receipt Scanner",
      description: "Upload receipts and let AI extract vendor, amount, date, and category automatically using GPT-4 Vision.",
      highlights: ["GPT-4 Vision", "99.9% Accuracy", "Auto Categorization"],
      color: "purple"
    },
    {
      icon: <FileText size={48} />,
      title: "Professional Invoices",
      description: "Create beautiful, customizable invoices with line items, tax calculations, and automatic invoice numbering.",
      highlights: ["Custom Branding", "Auto Numbering", "Tax Calculations"],
      color: "blue"
    },
    {
      icon: <TrendingUp size={48} />,
      title: "Expense Tracking",
      description: "Track all your business expenses in one place with automatic categorization and tax deduction estimates.",
      highlights: ["Auto Categorization", "Tax Deductions", "Real-time Insights"],
      color: "green"
    },
    {
      icon: <DollarSign size={48} />,
      title: "Real-time Analytics",
      description: "Get instant insights into your revenue, expenses, and profit margins with beautiful dashboards.",
      highlights: ["Real-time Data", "Profit Analysis", "Export Reports"],
      color: "orange"
    },
    {
      icon: <Shield size={48} />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secured with bank-level security and GDPR compliance.",
      highlights: ["Bank-level Security", "GDPR Compliant", "End-to-end Encryption"],
      color: "pink"
    },
    {
      icon: <Sparkles size={48} />,
      title: "Email Automation",
      description: "Send professional invoices directly to clients via email with automatic PDF generation.",
      highlights: ["Auto PDF Generation", "Email Reminders", "Client Portal"],
      color: "teal"
    }
  ];


  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <Sparkles size={28} />
            <span>QuickInvoice</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <button className="btn-login" onClick={onNavigateToLogin}>Login</button>
            <button className="btn-signup" onClick={onGetStarted}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Bot size={16} />
            <span>AI-Powered Invoicing</span>
          </div>
          <h1 className="hero-title">
            Invoice Smarter,
            <br />
            <span className="gradient-text">Get Paid Faster</span>
          </h1>
          <p className="hero-subtitle">
            Create professional invoices in seconds. Track expenses with AI-powered receipt scanning. 
            Manage your business finances effortlessly with cutting-edge technology.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onGetStarted}>
              <Rocket size={20} />
              Start Free Trial
              <ArrowRight size={20} />
            </button>
          </div>
          <p className="hero-note">No credit card required • Free 14-day trial</p>
          
          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <div className="trust-avatar">👨‍💼</div>
              <span>Trusted by Professionals</span>
            </div>
            <div className="trust-item">
              <div className="trust-avatar">🏆</div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="trust-item">
              <div className="trust-avatar">🔒</div>
              <span>Bank-Level Security</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-dashboard-mockup">
            <div className="dashboard-header">
              <div className="dashboard-nav">
                <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</div>
                <div className={`nav-item ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}>Invoices</div>
                <div className={`nav-item ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>Expenses</div>
              </div>
              <div className="user-avatar-small">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
            </div>
            
            {activeTab === 'dashboard' && (
              <>
                <div className="dashboard-stats">
                  <div className="stat-card-mini">
                    <div className="stat-icon-mini revenue">
                      <TrendingUp size={16} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label-mini">Revenue</span>
                      <span className="stat-value-mini">$24,500</span>
                    </div>
                  </div>
                  
                  <div className="stat-card-mini">
                    <div className="stat-icon-mini expenses">
                      <TrendingDown size={16} />
                    </div>
                    <div className="stat-info">
                      <span className="stat-label-mini">Expenses</span>
                      <span className="stat-value-mini">$8,200</span>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-chart">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '60%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '45%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                    <div className="bar" style={{height: '95%'}}></div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'invoices' && (
              <div className="tab-content">
                <div className="invoice-item">
                  <div className="invoice-info">
                    <span className="invoice-number">#INV-001</span>
                    <span className="invoice-client">Acme Corp</span>
                    <span className="invoice-amount">$2,500</span>
                  </div>
                  <div className="invoice-status paid">Paid</div>
                </div>
                <div className="invoice-item">
                  <div className="invoice-info">
                    <span className="invoice-number">#INV-002</span>
                    <span className="invoice-client">TechStart Inc</span>
                    <span className="invoice-amount">$1,800</span>
                  </div>
                  <div className="invoice-status pending">Pending</div>
                </div>
                <div className="invoice-item">
                  <div className="invoice-info">
                    <span className="invoice-number">#INV-003</span>
                    <span className="invoice-client">Design Co</span>
                    <span className="invoice-amount">$3,200</span>
                  </div>
                  <div className="invoice-status paid">Paid</div>
                </div>
              </div>
            )}

            {activeTab === 'expenses' && (
              <div className="tab-content">
                <div className="expense-item">
                  <div className="expense-info">
                    <span className="expense-category">Office Supplies</span>
                    <span className="expense-vendor">Staples</span>
                    <span className="expense-amount">$45.99</span>
                  </div>
                  <div className="expense-date">Dec 15</div>
                </div>
                <div className="expense-item">
                  <div className="expense-info">
                    <span className="expense-category">Meals</span>
                    <span className="expense-vendor">Restaurant ABC</span>
                    <span className="expense-amount">$89.50</span>
                  </div>
                  <div className="expense-date">Dec 14</div>
                </div>
                <div className="expense-item">
                  <div className="expense-info">
                    <span className="expense-category">Software</span>
                    <span className="expense-vendor">Adobe</span>
                    <span className="expense-amount">$29.99</span>
                  </div>
                  <div className="expense-date">Dec 13</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Floating Elements */}
          <div className="floating-elements">
            <div className="floating-card card-1">
              <Brain size={20} />
              <span>AI Analysis</span>
            </div>
            <div className="floating-card card-2">
              <CreditCard size={20} />
              <span>Auto Payment</span>
            </div>
            <div className="floating-card card-3">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </div>
            <div className="floating-card card-4">
              <Shield size={20} />
              <span>Secure</span>
            </div>
            <div className="floating-card card-5">
              <Rocket size={20} />
              <span>Fast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 6 Feature Grid */}
      <section className="features-grid" id="features">
        <div className="features-background">
          <div className="features-pattern"></div>
        </div>
        
        <div className="features-content">
          <div className="section-header">
            <h2>Everything you need to manage your business</h2>
            <p>Powerful features to streamline your invoicing and expense tracking</p>
          </div>

          <div className="features-container">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <div className={`icon-wrapper ${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-highlights">
                    {feature.highlights.map((highlight, idx) => (
                      <span key={idx} className="highlight">{highlight}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose QuickInvoice Section */}
      <section className="why-choose">
        <div className="why-choose-background">
          <div className="why-choose-pattern"></div>
        </div>
        
        <div className="why-choose-content">
          <div className="section-header">
            <h2>Built for Modern Businesses</h2>
            <p>Streamline your invoicing with intelligent automation</p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <Clock size={24} />
              </div>
              <h4>Save Time</h4>
              <p>Automate repetitive tasks and focus on growing your business</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <TrendingUp size={24} />
              </div>
              <h4>Increase Revenue</h4>
              <p>Faster invoicing means faster payments and better cash flow</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Shield size={24} />
              </div>
              <h4>Bank-Level Security</h4>
              <p>Your financial data is protected with enterprise-grade encryption</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">
                <Award size={24} />
              </div>
              <h4>Tax-Ready Reports</h4>
              <p>Generate tax reports and deductions automatically</p>
            </div>
          </div>

          <div className="comparison-simple">
            <div className="comparison-item">
              <div className="comparison-label">Manual Process</div>
              <div className="comparison-bar">
                <div className="bar-fill manual" style={{width: '30%'}}></div>
              </div>
              <div className="comparison-value">2-3 hours</div>
            </div>
            <div className="comparison-item">
              <div className="comparison-label">QuickInvoice</div>
              <div className="comparison-bar">
                <div className="bar-fill automated" style={{width: '95%'}}></div>
              </div>
              <div className="comparison-value">5 minutes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders Section */}
      <section className="trusted-by">
        <div className="trusted-background">
          <div className="trusted-pattern"></div>
        </div>
        
        <div className="trusted-content">
          <div className="section-header">
            <h2>Trusted by Industry Leaders</h2>
            <p>Join thousands of professionals who've transformed their invoicing</p>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">$2.5M+</div>
              <div className="stat-label">Invoices Processed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>

          <div className="companies-row">
            <div className="company-item">
              <span>Freelancers</span>
            </div>
            <div className="company-item">
              <span>Small Businesses</span>
            </div>
            <div className="company-item">
              <span>Consultants</span>
            </div>
            <div className="company-item">
              <span>Agencies</span>
            </div>
            <div className="company-item">
              <span>Creative Professionals</span>
            </div>
            <div className="company-item">
              <span>Startups</span>
            </div>
          </div>

          <div className="testimonial-quote">
            <blockquote>
              "QuickInvoice saved me 15 hours per week. I can now focus on my clients instead of paperwork. The AI receipt scanning is incredibly accurate!"
            </blockquote>
            <cite>
              <span className="author-name">Sarah Johnson</span>
              <span className="author-title">Freelance Designer</span>
            </cite>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="section-header">
          <h2>Simple, transparent pricing</h2>
          <p>Choose the plan that works best for you</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">
              <span className="amount">$0</span>
              <span className="period">/month</span>
            </div>
            <p className="plan-description">Perfect for trying out QuickInvoice</p>
            <ul className="features-list">
              <li><Check size={20} /> 5 invoices per month</li>
              <li><Check size={20} /> 10 expense scans per month</li>
              <li><Check size={20} /> Basic analytics</li>
              <li><Check size={20} /> Email support</li>
            </ul>
            <button className="btn-plan" onClick={onGetStarted}>Start Free</button>
          </div>

          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">
              <span className="amount">$20</span>
              <span className="period">/month</span>
            </div>
            <p className="plan-description">For growing businesses and freelancers</p>
            <ul className="features-list">
              <li><Check size={20} /> Unlimited invoices</li>
              <li><Check size={20} /> Unlimited expense scans</li>
              <li><Check size={20} /> Advanced analytics & reports</li>
              <li><Check size={20} /> Custom branding & logo</li>
              <li><Check size={20} /> Priority support</li>
              <li><Check size={20} /> Tax deduction estimates</li>
            </ul>
            <button className="btn-plan primary" onClick={onGetStarted}>Start Pro Trial</button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">
              <span className="amount">Custom</span>
            </div>
            <p className="plan-description">For teams and agencies</p>
            <ul className="features-list">
              <li><Check size={20} /> Everything in Pro</li>
              <li><Check size={20} /> Multi-user accounts</li>
              <li><Check size={20} /> API access</li>
              <li><Check size={20} /> Dedicated support</li>
              <li><Check size={20} /> Custom integrations</li>
            </ul>
            <button className="btn-plan">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-background">
          <div className="floating-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
            <div className="floating-element element-4"></div>
          </div>
        </div>
        
        <div className="how-it-works-content">
          <div className="section-header">
            <h2>How QuickInvoice Works</h2>
            <p>Get started in minutes with our simple 3-step process</p>
          </div>

          <div className="steps-showcase">
            <div className="steps-left">
              <div className="step-item step-up">
                <div className="step-visual">
                  <div className="step-icon-wrapper">
                    <FileText size={40} />
                  </div>
                  <div className="step-number">01</div>
                </div>
                <div className="step-content">
                  <h3>Create Your Invoice</h3>
                  <p>Use our intuitive form to create professional invoices with your branding and client details. Customize everything to match your business style.</p>
                  <div className="step-features">
                    <span className="feature-tag">Custom Branding</span>
                    <span className="feature-tag">Auto Numbering</span>
                    <span className="feature-tag">Tax Calculations</span>
                  </div>
                </div>
              </div>

              <div className="step-item step-up">
                <div className="step-visual">
                  <div className="step-icon-wrapper">
                    <TrendingUp size={40} />
                  </div>
                  <div className="step-number">03</div>
                </div>
                <div className="step-content">
                  <h3>Track & Analyze</h3>
                  <p>Monitor your revenue, expenses, and profit margins with real-time analytics and insights. Make data-driven decisions for your business.</p>
                  <div className="step-features">
                    <span className="feature-tag">Real-time Data</span>
                    <span className="feature-tag">Profit Analysis</span>
                    <span className="feature-tag">Export Reports</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="steps-center">
              <div className="center-line"></div>
              <div className="center-dots">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
              </div>
            </div>

            <div className="steps-right">
              <div className="step-item step-down">
                <div className="step-content">
                  <h3>Scan Receipts</h3>
                  <p>Upload receipt photos and let our AI extract vendor, amount, date, and category automatically using advanced computer vision.</p>
                  <div className="step-features">
                    <span className="feature-tag">AI-Powered</span>
                    <span className="feature-tag">Auto Categorization</span>
                    <span className="feature-tag">99.9% Accuracy</span>
                  </div>
                </div>
                <div className="step-visual">
                  <div className="step-icon-wrapper">
                    <Receipt size={40} />
                  </div>
                  <div className="step-number">02</div>
                </div>
              </div>
            </div>
          </div>

          <div className="process-flow">
            <div className="flow-arrow flow-1">
              <ArrowRight size={24} />
            </div>
            <div className="flow-arrow flow-2">
              <ArrowLeft size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Join thousands of satisfied users who've streamlined their invoicing</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p>"QuickInvoice has completely transformed how I manage my freelance business. The AI receipt scanning saves me hours every week!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=48&h=48&fit=crop&crop=face" alt="Sarah Mitchell" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="author-info">
                <h4>Sarah Mitchell</h4>
                <span>Freelance Designer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p>"The professional invoice templates and automated calculations have made my accounting so much easier. Highly recommended!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Michael Johnson" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="author-info">
                <h4>Michael Johnson</h4>
                <span>Small Business Owner</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p>"The expense tracking and analytics features give me insights I never had before. It's like having a personal accountant!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face" alt="Alexandra Lee" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              </div>
              <div className="author-info">
                <h4>Alexandra Lee</h4>
                <span>Consultant</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta">
        <div className="cta-background">
          <div className="cta-pattern"></div>
          <div className="cta-shapes">
            <div className="cta-shape cta-shape-1"></div>
            <div className="cta-shape cta-shape-2"></div>
            <div className="cta-shape cta-shape-3"></div>
          </div>
        </div>
        <div className="cta-content">
          <div className="cta-badge">
            <Sparkles size={16} />
            <span>Join 10,000+ Professionals</span>
          </div>
          <h2>Ready to streamline your invoicing?</h2>
          <p>Transform your business with AI-powered invoice management. Save time, reduce errors, and get paid faster.</p>
          <div className="cta-actions">
            <button className="btn-cta primary" onClick={onGetStarted}>
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <button className="btn-cta secondary" onClick={onNavigateToLogin}>
              Sign In
            </button>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <Check size={16} />
              <span>Free 14-day trial</span>
            </div>
            <div className="cta-feature">
              <Check size={16} />
              <span>No credit card required</span>
            </div>
            <div className="cta-feature">
              <Check size={16} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section main-section">
            <div className="footer-logo">
              <Sparkles size={24} />
              <span>QuickInvoice</span>
            </div>
            <p>The smartest way to manage invoices and expenses. Trusted by thousands of freelancers and small businesses worldwide.</p>
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
    </div>
  );
}

export default LandingPage;