import React, { useState } from 'react';
import { UserPlus, ArrowLeft } from 'lucide-react';

function SignupPage({ onSignup, onBackToHome, onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    taxId: '',
    website: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert('Account created successfully!');
        onSignup(data.user); // Pass user to parent component
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <button className="back-to-home-btn" onClick={onBackToHome}>
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Start managing your invoices today</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Company Name (Optional)</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Company Inc."
              />
            </div>

            <div className="form-group">
              <label>Business Address</label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="123 Business St, City, State, ZIP"
              />
            </div>

            <div className="form-group">
              <label>Business Phone</label>
              <input
                type="tel"
                name="businessPhone"
                value={formData.businessPhone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label>Business Email</label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleChange}
                placeholder="business@yourcompany.com"
              />
            </div>

            <div className="form-group">
              <label>Tax ID / EIN (Optional)</label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="12-3456789"
              />
            </div>

            <div className="form-group">
              <label>Website (Optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourcompany.com"
              />
            </div>

            <button type="submit" className="btn-auth" disabled={loading}>
              <UserPlus size={20} />
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToLogin(); }}>Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;