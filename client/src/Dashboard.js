import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Receipt, FileText, Settings, Palette, CreditCard, Plus, BarChart3 } from 'lucide-react';
import SettingsPage from './SettingsPage';
import TemplateGallery from './TemplateGallery';

function Dashboard({ onNavigateToView }) {
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, settings, templates
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    profit: 0,
    recentInvoices: [],
    recentExpenses: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [invoicesRes, expensesRes] = await Promise.all([
        fetch('http://localhost:5000/api/invoices'),
        fetch('http://localhost:5000/api/expenses')
      ]);

      const invoices = await invoicesRes.json();
      const expenses = await expensesRes.json();

      const totalRevenue = invoices.reduce((sum, inv) => 
        sum + parseFloat(inv.total || inv.amount || 0), 0
      );

      const totalExpenses = expenses.reduce((sum, exp) => 
        sum + parseFloat(exp.amount || 0), 0
      );

      setStats({
        totalRevenue,
        totalExpenses,
        profit: totalRevenue - totalExpenses,
        recentInvoices: invoices.slice(0, 5),
        recentExpenses: expenses.slice(0, 5)
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (currentView === 'settings') {
    return <SettingsPage onBackToDashboard={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'templates') {
    return <TemplateGallery onBackToDashboard={() => setCurrentView('dashboard')} />;
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-actions">
          <button 
            className="btn-primary"
            onClick={() => onNavigateToView('create')}
          >
            <Plus size={20} />
            New Invoice
          </button>
        </div>
      </div>
      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-icon">
            <TrendingUp size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h2 className="stat-value">${stats.totalRevenue.toFixed(2)}</h2>
            <p className="stat-change positive">
              <TrendingUp size={14} />
              From {stats.recentInvoices.length} invoices
            </p>
          </div>
        </div>

        <div className="stat-card expenses">
          <div className="stat-icon">
            <TrendingDown size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Expenses</p>
            <h2 className="stat-value">${stats.totalExpenses.toFixed(2)}</h2>
            <p className="stat-change negative">
              <TrendingDown size={14} />
              From {stats.recentExpenses.length} expenses
            </p>
          </div>
        </div>

        <div className="stat-card profit">
          <div className="stat-icon">
            <DollarSign size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Net Profit</p>
            <h2 className="stat-value">${stats.profit.toFixed(2)}</h2>
            <p className={`stat-change ${stats.profit >= 0 ? 'positive' : 'negative'}`}>
              {stats.profit >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {((stats.profit / stats.totalRevenue) * 100 || 0).toFixed(1)}% margin
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-grid">
        {/* Recent Invoices */}
        <div className="activity-card">
          <div className="activity-header">
            <div className="header-left">
              <FileText size={20} />
              <h3>Recent Invoices</h3>
            </div>
            <span 
              className="view-all"
              onClick={() => onNavigateToView('invoices')}
              style={{ cursor: 'pointer' }}
            >
              View All →
            </span>
          </div>

          {stats.recentInvoices.length === 0 ? (
            <div className="empty-state-small">
              <p>No invoices yet</p>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentInvoices.map((invoice) => (
                <div key={invoice.id} className="activity-item">
                  <div className="item-left">
                    <div className="item-icon blue">
                      <FileText size={16} />
                    </div>
                    <div className="item-info">
                      <p className="item-title">{invoice.client_name}</p>
                      <p className="item-subtitle">
                        {invoice.invoice_number || `#${invoice.id}`}
                      </p>
                    </div>
                  </div>
                  <div className="item-right">
                    <p className="item-amount">+${parseFloat(invoice.total || invoice.amount || 0).toFixed(2)}</p>
                    <span className={`status-badge ${invoice.status}`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="activity-card">
          <div className="activity-header">
            <div className="header-left">
              <Receipt size={20} />
              <h3>Recent Expenses</h3>
            </div>
            <span 
              className="view-all"
              onClick={() => onNavigateToView('expenses')}
              style={{ cursor: 'pointer' }}
            >
              View All →
            </span>
          </div>

          {stats.recentExpenses.length === 0 ? (
            <div className="empty-state-small">
              <p>No expenses yet</p>
            </div>
          ) : (
            <div className="activity-list">
              {stats.recentExpenses.map((expense) => (
                <div key={expense.id} className="activity-item">
                  <div className="item-left">
                    <div className="item-icon orange">
                      <Receipt size={16} />
                    </div>
                    <div className="item-info">
                      <p className="item-title">{expense.vendor}</p>
                      <p className="item-subtitle">{expense.category}</p>
                    </div>
                  </div>
                  <div className="item-right">
                    <p className="item-amount expense">-${parseFloat(expense.amount).toFixed(2)}</p>
                    <p className="item-date">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button 
            className="action-btn"
            onClick={() => onNavigateToView('create')}
          >
            <FileText size={20} />
            Create Invoice
          </button>
          <button 
            className="action-btn"
            onClick={() => onNavigateToView('scanner')}
          >
            <Receipt size={20} />
            Scan Receipt
          </button>
          <button 
            className="action-btn"
            onClick={() => onNavigateToView('expenses')}
          >
            <DollarSign size={20} />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;