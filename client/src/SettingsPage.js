import React, { useState } from 'react';
import { Settings, User, CreditCard, Bell, Shield, Palette, Upload, Save, ArrowLeft } from 'lucide-react';

function SettingsPage({ onBackToDashboard }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'My Company',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345'
  });

  const [billingInfo, setBillingInfo] = useState({
    plan: 'Pro',
    nextBilling: '2024-02-15',
    paymentMethod: '•••• •••• •••• 4242'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    weekly: true,
    monthly: false
  });

  const handleInputChange = (section, field, value) => {
    if (section === 'profile') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'notifications') {
      setNotifications(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-btn" onClick={onBackToDashboard}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Settings</h1>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="settings-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('profile', 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Business Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <div className="file-upload">
                    <Upload size={20} />
                    <span>Upload Photo</span>
                    <input type="file" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="settings-section">
              <h2>Billing & Subscription</h2>
              <div className="billing-info">
                <div className="billing-card">
                  <h3>Current Plan</h3>
                  <div className="plan-details">
                    <span className="plan-name">{billingInfo.plan}</span>
                    <span className="plan-price">$29/month</span>
                  </div>
                  <p>Next billing date: {billingInfo.nextBilling}</p>
                </div>
                
                <div className="billing-card">
                  <h3>Payment Method</h3>
                  <div className="payment-method">
                    <CreditCard size={20} />
                    <span>{billingInfo.paymentMethod}</span>
                    <button className="btn-secondary">Update</button>
                  </div>
                </div>

                <div className="billing-actions">
                  <button className="btn-primary">Upgrade Plan</button>
                  <button className="btn-secondary">Download Invoice</button>
                  <button className="btn-danger">Cancel Subscription</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="notification-settings">
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates via email</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>SMS Notifications</h4>
                    <p>Receive updates via SMS</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="notification-item">
                  <div className="notification-info">
                    <h4>Push Notifications</h4>
                    <p>Receive browser notifications</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={(e) => handleInputChange('notifications', 'push', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <div className="security-settings">
                <div className="security-item">
                  <h4>Change Password</h4>
                  <p>Update your account password</p>
                  <button className="btn-secondary">Change Password</button>
                </div>
                
                <div className="security-item">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>
                
                <div className="security-item">
                  <h4>Login Activity</h4>
                  <p>View recent login attempts</p>
                  <button className="btn-secondary">View Activity</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <div className="appearance-settings">
                <div className="theme-selector">
                  <h4>Theme</h4>
                  <div className="theme-options">
                    <button className="theme-option active">Light</button>
                    <button className="theme-option">Dark</button>
                    <button className="theme-option">Auto</button>
                  </div>
                </div>
                
                <div className="color-selector">
                  <h4>Accent Color</h4>
                  <div className="color-options">
                    <div className="color-option active" style={{backgroundColor: '#667eea'}}></div>
                    <div className="color-option" style={{backgroundColor: '#f093fb'}}></div>
                    <div className="color-option" style={{backgroundColor: '#4facfe'}}></div>
                    <div className="color-option" style={{backgroundColor: '#43e97b'}}></div>
                    <div className="color-option" style={{backgroundColor: '#fa709a'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="btn-primary" onClick={handleSave}>
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
