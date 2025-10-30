import React from 'react';
import { Sparkles } from 'lucide-react';

function Navigation({ onNavigateToLogin, onGetStarted, onNavigateToPage }) {
  const scrollToSection = (sectionId) => {
    if (sectionId.startsWith('#')) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="landing-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Sparkles size={28} />
          <span>QuickInvoice</span>
        </div>
        <div className="nav-links">
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('#features'); }}>Features</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('#pricing'); }}>Pricing</a>
          <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('#testimonials'); }}>Testimonials</a>
          <button className="btn-login" onClick={onNavigateToLogin}>Login</button>
          <button className="btn-signup" onClick={onGetStarted}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;