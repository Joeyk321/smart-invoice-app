import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Plus, ThumbsUp, MessageSquare, Zap, Star } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function StatusPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const [newFeature, setNewFeature] = useState({
    title: '',
    description: '',
    category: 'feature'
  });

  const [features, setFeatures] = useState([
    {
      id: 1,
      title: 'Multi-currency Support',
      description: 'Add support for multiple currencies in invoices',
      status: 'in-progress',
      votes: 45,
      category: 'feature',
      submittedBy: 'Sarah M.',
      submittedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Recurring Invoices',
      description: 'Automatically generate recurring invoices',
      status: 'planned',
      votes: 32,
      category: 'feature',
      submittedBy: 'Mike R.',
      submittedDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Mobile App',
      description: 'Native mobile app for iOS and Android',
      status: 'completed',
      votes: 67,
      category: 'feature',
      submittedBy: 'Alex K.',
      submittedDate: '2024-01-05'
    },
    {
      id: 4,
      title: 'Advanced Reporting',
      description: 'More detailed financial reports and analytics',
      status: 'in-progress',
      votes: 28,
      category: 'feature',
      submittedBy: 'Emma L.',
      submittedDate: '2024-01-12'
    },
    {
      id: 5,
      title: 'API Integration',
      description: 'REST API for third-party integrations',
      status: 'planned',
      votes: 41,
      category: 'integration',
      submittedBy: 'David P.',
      submittedDate: '2024-01-08'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const handleSubmitFeature = (e) => {
    e.preventDefault();
    if (newFeature.title && newFeature.description) {
      const feature = {
        id: features.length + 1,
        ...newFeature,
        status: 'submitted',
        votes: 0,
        submittedBy: 'You',
        submittedDate: new Date().toISOString().split('T')[0]
      };
      setFeatures([feature, ...features]);
      setNewFeature({ title: '', description: '', category: 'feature' });
      alert('Feature request submitted! Thank you for your feedback.');
    }
  };

  const handleVote = (id) => {
    setFeatures(features.map(feature => 
      feature.id === id 
        ? { ...feature, votes: feature.votes + 1 }
        : feature
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="status-completed" />;
      case 'in-progress':
        return <Clock size={20} className="status-in-progress" />;
      case 'planned':
        return <AlertCircle size={20} className="status-planned" />;
      default:
        return <MessageSquare size={20} className="status-submitted" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Submitted';
    }
  };

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab);

  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>Product Status & Feature Requests</h1>
          <p className="page-subtitle">
            Track our development progress and submit your feature ideas. Your feedback helps us build the best invoicing platform.
          </p>
        </div>

        <div className="status-container">
          {/* Submit Feature Request */}
          <div className="feature-request-section">
            <h2>Submit a Feature Request</h2>
            <form onSubmit={handleSubmitFeature} className="feature-form">
              <div className="form-group">
                <label>Feature Title</label>
                <input
                  type="text"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                  placeholder="What feature would you like to see?"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  placeholder="Describe how this feature would help you..."
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newFeature.category}
                  onChange={(e) => setNewFeature({...newFeature, category: e.target.value})}
                >
                  <option value="feature">Feature Request</option>
                  <option value="integration">Integration</option>
                  <option value="ui">User Interface</option>
                  <option value="performance">Performance</option>
                </select>
              </div>
              <button type="submit" className="btn-primary">
                <Plus size={20} />
                Submit Feature Request
              </button>
            </form>
          </div>

          {/* Feature Tabs */}
          <div className="feature-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Features
            </button>
            <button 
              className={`tab ${activeTab === 'feature' ? 'active' : ''}`}
              onClick={() => setActiveTab('feature')}
            >
              Features
            </button>
            <button 
              className={`tab ${activeTab === 'integration' ? 'active' : ''}`}
              onClick={() => setActiveTab('integration')}
            >
              Integrations
            </button>
          </div>

          {/* Features List */}
          <div className="features-list">
            {filteredFeatures.map(feature => (
              <div key={feature.id} className="feature-card">
                <div className="feature-header">
                  <div className="feature-title">
                    <h3>{feature.title}</h3>
                    <span className="feature-category">{feature.category}</span>
                  </div>
                  <div className="feature-status">
                    {getStatusIcon(feature.status)}
                    <span>{getStatusText(feature.status)}</span>
                  </div>
                </div>
                
                <p className="feature-description">{feature.description}</p>
                
                <div className="feature-meta">
                  <div className="feature-submitter">
                    <span>Submitted by {feature.submittedBy}</span>
                    <span>•</span>
                    <span>{feature.submittedDate}</span>
                  </div>
                  
                  <div className="feature-actions">
                    <button 
                      className="vote-btn"
                      onClick={() => handleVote(feature.id)}
                    >
                      <ThumbsUp size={16} />
                      {feature.votes} votes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Development Roadmap */}
          <div className="roadmap-section">
            <h2>Development Roadmap</h2>
            <div className="roadmap-timeline">
              <div className="timeline-item completed">
                <div className="timeline-marker">
                  <CheckCircle size={20} />
                </div>
                <div className="timeline-content">
                  <h4>Q1 2024 - Core Features</h4>
                  <p>Basic invoicing, expense tracking, and user management</p>
                  <span className="timeline-status completed">Completed</span>
                </div>
              </div>
              
              <div className="timeline-item in-progress">
                <div className="timeline-marker">
                  <Clock size={20} />
                </div>
                <div className="timeline-content">
                  <h4>Q2 2024 - Advanced Features</h4>
                  <p>Multi-currency support, advanced reporting, and mobile app</p>
                  <span className="timeline-status in-progress">In Progress</span>
                </div>
              </div>
              
              <div className="timeline-item planned">
                <div className="timeline-marker">
                  <AlertCircle size={20} />
                </div>
                <div className="timeline-content">
                  <h4>Q3 2024 - Integrations</h4>
                  <p>API development, third-party integrations, and automation</p>
                  <span className="timeline-status planned">Planned</span>
                </div>
              </div>
              
              <div className="timeline-item planned">
                <div className="timeline-marker">
                  <Star size={20} />
                </div>
                <div className="timeline-content">
                  <h4>Q4 2024 - AI Enhancement</h4>
                  <p>Advanced AI features, smart categorization, and predictive analytics</p>
                  <span className="timeline-status planned">Planned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default StatusPage;
