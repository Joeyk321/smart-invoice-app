import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Receipt, DollarSign, Menu, X, Palette, LogOut, Settings, Users, FileCheck } from 'lucide-react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';
import InvoicesView from './InvoicesView';
import TemplateGallery from './TemplateGallery';
import CreateInvoice from './CreateInvoice';
import ExpenseScanner from './ExpenseScanner';
import ExpensesDashboard from './ExpensesDashboard';
import ClientsPage from './ClientsPage';
import EstimatesPage from './EstimatesPage';
import SettingsPage from './SettingsPage';
import ContactPage from './ContactPage';
import BlogPage from './BlogPage';
import PrivacyPage from './PrivacyPage';
import TermsPage from './TermsPage';
import HelpPage from './HelpPage';
import StatusPage from './StatusPage';
import GDPRPage from './GDPRPage';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing'); // landing, login, signup, app, contact, blog, privacy, terms, help
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      setCurrentPage('app');
    }

    fetch('http://localhost:5000/api/test')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error: ' + err.message));
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('app');
  };

  const handleSignup = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('landing');
  };

  const handleGetStarted = () => {
    setCurrentPage('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  const handleNavigateToSignup = () => {
    setCurrentPage('signup');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  const handleNavigateToPage = (page) => {
    setCurrentPage(page);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'estimates', label: 'Estimates', icon: FileCheck },
    { id: 'create', label: 'Create Invoice', icon: FileText },
    { id: 'scanner', label: 'Scan Receipt', icon: Receipt },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Show Landing Page
  if (currentPage === 'landing' && !isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} onNavigateToLogin={handleNavigateToLogin} onNavigateToPage={handleNavigateToPage} />;
  }

  // Show Login Page
  if (currentPage === 'login' && !isAuthenticated) {
    return <LoginPage onLogin={handleLogin} onBackToHome={handleBackToHome} onNavigateToSignup={handleNavigateToSignup} />;
  }

  // Show Signup Page
  if (currentPage === 'signup' && !isAuthenticated) {
    return <SignupPage onSignup={handleSignup} onBackToHome={handleBackToHome} onNavigateToLogin={handleNavigateToLogin} />;
  }

  // Show other pages
  if (currentPage === 'contact') {
    return <ContactPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'blog') {
    return <BlogPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'terms') {
    return <TermsPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'help') {
    return <HelpPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'status') {
    return <StatusPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  if (currentPage === 'gdpr') {
    return <GDPRPage onBackToHome={handleBackToHome} onNavigateToPage={handleNavigateToPage} onNavigateToLogin={handleNavigateToLogin} onNavigateToSignup={handleNavigateToSignup} />;
  }

  // Show Dashboard (Protected)
  if (!isAuthenticated) {
    return <LandingPage onGetStarted={handleGetStarted} onNavigateToLogin={handleNavigateToLogin} onNavigateToPage={handleNavigateToPage} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">QuickInvoice</h1>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => setCurrentView(item.id)}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button 
            className="nav-item logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
          <div className="status-indicator">
            <span className={`status-dot ${message === 'Backend is working!' ? 'active' : 'inactive'}`}></span>
            {sidebarOpen && <span className="status-text">System Active</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h2 className="page-title">
            {navItems.find(item => item.id === currentView)?.label}
          </h2>
          <div className="header-actions">
            <span className="user-name">{user?.name}</span>
            <span className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        <div className="content-wrapper">
          {currentView === 'dashboard' && <Dashboard onNavigateToView={setCurrentView} />}
          {currentView === 'invoices' && <InvoicesView onNavigateToView={setCurrentView} />}
          {currentView === 'templates' && <TemplateGallery onNavigateToView={setCurrentView} />}
          {currentView === 'clients' && <ClientsPage onNavigateToView={setCurrentView} onNavigateToPage={setCurrentView} />}
          {currentView === 'estimates' && <EstimatesPage onNavigateToView={setCurrentView} onNavigateToPage={setCurrentView} />}
          {currentView === 'create' && <CreateInvoice onNavigateToView={setCurrentView} />}
          {currentView === 'scanner' && <ExpenseScanner onNavigateToView={setCurrentView} />}
          {currentView === 'expenses' && <ExpensesDashboard onNavigateToView={setCurrentView} />}
          {currentView === 'settings' && <SettingsPage onNavigateToView={setCurrentView} />}
        </div>
      </main>
    </div>
  );
}

export default App;