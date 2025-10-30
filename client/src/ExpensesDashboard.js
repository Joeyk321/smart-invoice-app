import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, X, Check, Download, Filter, Search, Calendar, DollarSign, TrendingDown } from 'lucide-react';

function ExpensesDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    vendor: '',
    amount: '',
    category: '',
    date: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, searchTerm, selectedCategory, dateRange]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      const data = await response.json();
      setExpenses(data);
      setFilteredExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }

    // Date range filter
    if (dateRange.start) {
      filtered = filtered.filter(exp => new Date(exp.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(exp => new Date(exp.date) <= new Date(dateRange.end));
    }

    setFilteredExpenses(filtered);
  };

 const deleteExpense = async (id) => {
  if (!window.confirm('Are you sure you want to delete this expense?')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (response.ok) {
      alert('Expense deleted successfully!');
      fetchExpenses(); // Refresh the list
    } else {
      alert('Error: ' + (data.error || 'Failed to delete'));
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting expense: ' + error.message);
  }
};
  const startEdit = (expense) => {
    setEditingExpense(expense.id);
    setEditForm({
      vendor: expense.vendor,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
  };

  const cancelEdit = () => {
    setEditingExpense(null);
    setEditForm({ vendor: '', amount: '', category: '', date: '' });
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm)
      });
      alert('Expense updated successfully!');
      setEditingExpense(null);
      fetchExpenses();
    } catch (error) {
      alert('Error updating expense: ' + error.message);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Vendor', 'Category', 'Amount'];
    const rows = filteredExpenses.map(exp => [
      new Date(exp.date).toLocaleDateString(),
      exp.vendor,
      exp.category,
      exp.amount
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Calculate stats
  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const categories = [...new Set(expenses.map(exp => exp.category))];
  
  const categoryTotals = categories.map(cat => ({
    category: cat,
    total: expenses.filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  })).sort((a, b) => b.total - a.total);

  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  return (
    <div className="expenses-dashboard">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card expenses">
          <div className="stat-icon">
            <TrendingDown size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Expenses</p>
            <h2 className="stat-value">${totalExpenses.toFixed(2)}</h2>
            <p className="stat-change negative">
              {filteredExpenses.length} expenses tracked
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Filter size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Categories</p>
            <h2 className="stat-value">{categories.length}</h2>
            <p className="stat-subtitle">Active categories</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Calendar size={28} />
          </div>
          <div className="stat-content">
            <p className="stat-label">This Month</p>
            <h2 className="stat-value">
              ${expenses.filter(exp => 
                new Date(exp.date).getMonth() === new Date().getMonth()
              ).reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)}
            </h2>
            <p className="stat-subtitle">Current month spending</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by vendor or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="date-input"
            placeholder="Start date"
          />

          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="date-input"
            placeholder="End date"
          />

          <button onClick={exportToCSV} className="btn-export">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="table-container">
        <div className="table-header">
          <h2>Expenses</h2>
          <span className="expense-count">{filteredExpenses.length} expenses</span>
        </div>

        {filteredExpenses.length === 0 ? (
          <div className="empty-state">
            <DollarSign size={48} />
            <p>No expenses found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Receipt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    {editingExpense === expense.id ? (
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      new Date(expense.date).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingExpense === expense.id ? (
                      <input
                        type="text"
                        value={editForm.vendor}
                        onChange={(e) => setEditForm({ ...editForm, vendor: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      expense.vendor
                    )}
                  </td>
                  <td>
                    {editingExpense === expense.id ? (
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      <span className="category-badge">{expense.category}</span>
                    )}
                  </td>
                  <td className="amount">
                    {editingExpense === expense.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        className="edit-input"
                      />
                    ) : (
                      `$${parseFloat(expense.amount).toFixed(2)}`
                    )}
                  </td>
                  <td>
                    {expense.receipt_url && (
                      <button
                        onClick={() => setSelectedExpense(expense)}
                        className="btn-view-receipt"
                      >
                        View
                      </button>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {editingExpense === expense.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(expense.id)}
                            className="btn-icon success"
                            title="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="btn-icon"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(expense)}
                            className="btn-icon"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="btn-icon danger"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <h3>Spending by Category</h3>
        <div className="category-list">
          {categoryTotals.map((cat) => (
            <div key={cat.category} className="category-item">
              <div className="category-info">
                <span className="category-name">{cat.category}</span>
                <span className="category-amount">${cat.total.toFixed(2)}</span>
              </div>
              <div className="category-bar">
                <div
                  className="category-fill"
                  style={{
                    width: `${(cat.total / totalExpenses) * 100}%`
                  }}
                ></div>
              </div>
              <span className="category-percentage">
                {((cat.total / totalExpenses) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedExpense && (
        <div className="modal-overlay" onClick={() => setSelectedExpense(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Receipt - {selectedExpense.vendor}</h2>
              <button onClick={() => setSelectedExpense(null)} className="btn-close">✕</button>
            </div>
            <div className="modal-body">
              <img
                src={`http://localhost:5000/${selectedExpense.receipt_url}`}
                alt="Receipt"
                className="receipt-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpensesDashboard;