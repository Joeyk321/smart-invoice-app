import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Send, Edit, Trash2, Eye, Download, Calendar, DollarSign, Clock, Mail, X } from 'lucide-react';

function EstimatesPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const [estimates, setEstimates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddEstimate, setShowAddEstimate] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [previewEstimate, setPreviewEstimate] = useState(null);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [editingEstimate, setEditingEstimate] = useState(null);
  const [newEstimate, setNewEstimate] = useState({
    clientName: '',
    clientEmail: '',
    clientCompany: '',
    clientAddress: '',
    title: '',
    description: '',
    items: [
      { description: '', quantity: 1, rate: 0, amount: 0 }
    ],
    subtotal: 0,
    tax: 0,
    total: 0,
    validUntil: '',
    notes: '',
    status: 'draft' // draft, sent, accepted, rejected, expired
  });

  // Load estimates from localStorage
  useEffect(() => {
    const savedEstimates = JSON.parse(localStorage.getItem('estimates') || '[]');
    setEstimates(savedEstimates);
  }, []);

  // Save estimates to localStorage
  const saveEstimates = (updatedEstimates) => {
    localStorage.setItem('estimates', JSON.stringify(updatedEstimates));
    setEstimates(updatedEstimates);
  };

  // Calculate totals
  const calculateTotals = (items, taxRate = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Add new item
  const addItem = () => {
    setNewEstimate({
      ...newEstimate,
      items: [...newEstimate.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  // Remove item
  const removeItem = (index) => {
    const updatedItems = newEstimate.items.filter((_, i) => i !== index);
    const totals = calculateTotals(updatedItems);
    setNewEstimate({
      ...newEstimate,
      items: updatedItems,
      ...totals
    });
  };

  // Update item
  const updateItem = (index, field, value) => {
    const updatedItems = newEstimate.items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    const totals = calculateTotals(updatedItems);
    setNewEstimate({
      ...newEstimate,
      items: updatedItems,
      ...totals
    });
  };

  // Add new estimate
  const handleAddEstimate = () => {
    if (!newEstimate.clientName || !newEstimate.clientEmail) {
      alert('Please fill in at least client name and email');
      return;
    }

    const estimate = {
      id: Date.now().toString(),
      ...newEstimate,
      estimateNumber: `EST-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    const updatedEstimates = [...estimates, estimate];
    saveEstimates(updatedEstimates);
    resetForm();
  };

  // Edit estimate
  const handleEditEstimate = (estimate) => {
    setEditingEstimate(estimate);
    setNewEstimate(estimate);
    setShowAddEstimate(true);
  };

  // Update estimate
  const handleUpdateEstimate = () => {
    const updatedEstimates = estimates.map(estimate => 
      estimate.id === editingEstimate.id 
        ? { ...estimate, ...newEstimate, lastModified: new Date().toISOString() }
        : estimate
    );
    saveEstimates(updatedEstimates);
    resetForm();
  };

  // Delete estimate
  const handleDeleteEstimate = (estimateId) => {
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      const updatedEstimates = estimates.filter(estimate => estimate.id !== estimateId);
      saveEstimates(updatedEstimates);
    }
  };

  // Preview estimate
  const handlePreviewEstimate = (estimate) => {
    setPreviewEstimate(estimate);
    setShowPreview(true);
  };

  // Send estimate via email
  const handleSendEstimateEmail = (estimate) => {
    setPreviewEstimate(estimate);
    setEmailData({
      to: estimate.clientEmail,
      subject: `Estimate ${estimate.estimateNumber} - ${estimate.title || 'Project Estimate'}`,
      message: `Dear ${estimate.clientName},\n\nPlease find attached your estimate for ${estimate.title || 'the project'}.\n\nTotal Amount: $${estimate.total.toFixed(2)}\nValid Until: ${estimate.validUntil ? new Date(estimate.validUntil).toLocaleDateString() : '30 days'}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nYour Company`
    });
    setShowEmailModal(true);
  };

  // Send email
  const handleSendEmail = async () => {
    try {
      // Simulate email sending (in real app, you'd call your email API)
      const emailPayload = {
        to: emailData.to,
        subject: emailData.subject,
        body: emailData.message,
        estimate: previewEstimate
      };

      // For demo purposes, we'll just show an alert
      alert(`Email sent successfully to ${emailData.to}!`);
      
      // Update estimate status
      const updatedEstimates = estimates.map(est => 
        est.id === previewEstimate.id 
          ? { ...est, status: 'sent', sentAt: new Date().toISOString() }
          : est
      );
      saveEstimates(updatedEstimates);
      
      setShowEmailModal(false);
      setShowPreview(false);
    } catch (error) {
      alert('Failed to send email. Please try again.');
    }
  };

  // Download estimate as PDF
  const handleDownloadEstimate = (estimate) => {
    // Generate PDF content (simplified for demo)
    const pdfContent = generateEstimatePDF(estimate);
    
    // Create and download PDF
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `estimate-${estimate.estimateNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Generate PDF content (simplified)
  const generateEstimatePDF = (estimate) => {
    return `
      ESTIMATE ${estimate.estimateNumber}
      
      Client: ${estimate.clientName}
      Email: ${estimate.clientEmail}
      Company: ${estimate.clientCompany || 'N/A'}
      
      Project: ${estimate.title || 'Untitled Estimate'}
      
      Items:
      ${estimate.items.map(item => 
        `${item.description} - Qty: ${item.quantity} - Rate: $${item.rate} - Total: $${item.amount}`
      ).join('\n')}
      
      Subtotal: $${estimate.subtotal.toFixed(2)}
      Tax: $${estimate.tax.toFixed(2)}
      Total: $${estimate.total.toFixed(2)}
      
      Valid Until: ${estimate.validUntil ? new Date(estimate.validUntil).toLocaleDateString() : '30 days'}
      
      Notes: ${estimate.notes || 'None'}
    `;
  };

  // Convert to invoice
  const handleConvertToInvoice = (estimate) => {
    // Navigate to invoice creation with estimate data
    onNavigateToPage('create');
  };

  // Reset form
  const resetForm = () => {
    setNewEstimate({
      clientName: '',
      clientEmail: '',
      clientCompany: '',
      clientAddress: '',
      title: '',
      description: '',
      items: [
        { description: '', quantity: 1, rate: 0, amount: 0 }
      ],
      subtotal: 0,
      tax: 0,
      total: 0,
      validUntil: '',
      notes: '',
      status: 'draft'
    });
    setShowAddEstimate(false);
    setEditingEstimate(null);
  };

  // Filter estimates based on search
  const filteredEstimates = estimates.filter(estimate =>
    estimate.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    estimate.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    estimate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    estimate.estimateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return '#6b7280';
      case 'sent': return '#3b82f6';
      case 'accepted': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'expired': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Estimates & Proposals</h1>
            <p>Create professional estimates and proposals for your clients</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Header Section */}
          <div className="estimates-header">
            <div className="header-left">
              <h2>All Estimates</h2>
              <p>{estimates.length} total estimates</p>
            </div>
            <div className="header-right">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search estimates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                className="btn-primary"
                onClick={() => setShowAddEstimate(true)}
              >
                <Plus size={20} />
                New Estimate
              </button>
            </div>
          </div>

          {/* Add/Edit Estimate Modal */}
          {showAddEstimate && (
            <div className="modal-overlay" onClick={resetForm}>
              <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{editingEstimate ? 'Edit Estimate' : 'Create New Estimate'}</h3>
                  <button 
                    className="modal-close"
                    onClick={resetForm}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  {/* Client Information */}
                  <div className="form-section">
                    <h4>Client Information</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Client Name *</label>
                        <input
                          type="text"
                          value={newEstimate.clientName}
                          onChange={(e) => setNewEstimate({...newEstimate, clientName: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email *</label>
                        <input
                          type="email"
                          value={newEstimate.clientEmail}
                          onChange={(e) => setNewEstimate({...newEstimate, clientEmail: e.target.value})}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Company</label>
                        <input
                          type="text"
                          value={newEstimate.clientCompany}
                          onChange={(e) => setNewEstimate({...newEstimate, clientCompany: e.target.value})}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="form-group">
                        <label>Valid Until</label>
                        <input
                          type="date"
                          value={newEstimate.validUntil}
                          onChange={(e) => setNewEstimate({...newEstimate, validUntil: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Client Address</label>
                      <textarea
                        value={newEstimate.clientAddress}
                        onChange={(e) => setNewEstimate({...newEstimate, clientAddress: e.target.value})}
                        placeholder="123 Main Street, City, State 12345"
                        rows="2"
                      />
                    </div>
                  </div>

                  {/* Estimate Details */}
                  <div className="form-section">
                    <h4>Estimate Details</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={newEstimate.title}
                          onChange={(e) => setNewEstimate({...newEstimate, title: e.target.value})}
                          placeholder="Website Development Project"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={newEstimate.description}
                        onChange={(e) => setNewEstimate({...newEstimate, description: e.target.value})}
                        placeholder="Brief description of the project..."
                        rows="3"
                      />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="form-section">
                    <div className="section-header">
                      <h4>Items & Services</h4>
                      <button 
                        type="button"
                        className="btn-secondary"
                        onClick={addItem}
                      >
                        <Plus size={16} />
                        Add Item
                      </button>
                    </div>
                    
                    <div className="items-table">
                      <div className="items-header">
                        <div>Description</div>
                        <div>Qty</div>
                        <div>Rate</div>
                        <div>Amount</div>
                        <div>Action</div>
                      </div>
                      
                      {newEstimate.items.map((item, index) => (
                        <div key={index} className="item-row">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            placeholder="Service description"
                          />
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                          <div className="amount-display">
                            ${(item.quantity * item.rate).toFixed(2)}
                          </div>
                          <button 
                            type="button"
                            className="remove-item-btn"
                            onClick={() => removeItem(index)}
                            disabled={newEstimate.items.length === 1}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="totals-section">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>${newEstimate.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="total-row">
                        <span>Tax (0%):</span>
                        <span>${newEstimate.tax.toFixed(2)}</span>
                      </div>
                      <div className="total-row final">
                        <span><strong>Total:</strong></span>
                        <span><strong>${newEstimate.total.toFixed(2)}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="form-section">
                    <h4>Additional Notes</h4>
                    <div className="form-group">
                      <textarea
                        value={newEstimate.notes}
                        onChange={(e) => setNewEstimate({...newEstimate, notes: e.target.value})}
                        placeholder="Terms and conditions, payment terms, etc..."
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    className="btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={editingEstimate ? handleUpdateEstimate : handleAddEstimate}
                  >
                    {editingEstimate ? 'Update Estimate' : 'Create Estimate'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Estimates Grid */}
          <div className="estimates-grid">
            {filteredEstimates.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={48} />
                </div>
                <h3>No estimates found</h3>
                <p>{searchQuery ? 'Try adjusting your search terms' : 'Create your first estimate to get started'}</p>
                {!searchQuery && (
                  <button 
                    className="btn-primary"
                    onClick={() => setShowAddEstimate(true)}
                  >
                    <Plus size={20} />
                    Create First Estimate
                  </button>
                )}
              </div>
            ) : (
              filteredEstimates.map(estimate => (
                <div key={estimate.id} className="estimate-card">
                  <div className="estimate-header">
                    <div className="estimate-info">
                      <h3>{estimate.title || 'Untitled Estimate'}</h3>
                      <p>{estimate.clientName} - {estimate.clientCompany || 'Individual'}</p>
                    </div>
                    <div className="estimate-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(estimate.status) }}
                      >
                        {estimate.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="estimate-details">
                    <div className="detail-item">
                      <FileText size={16} />
                      <span>{estimate.estimateNumber}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>{new Date(estimate.createdAt).toLocaleDateString()}</span>
                    </div>
                    {estimate.validUntil && (
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>Valid until {new Date(estimate.validUntil).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="estimate-total">
                    <DollarSign size={20} />
                    <span className="total-amount">${estimate.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="estimate-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handlePreviewEstimate(estimate)}
                      title="Preview Estimate"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleDownloadEstimate(estimate)}
                      title="Download PDF"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleSendEstimateEmail(estimate)}
                      title="Send via Email"
                    >
                      <Mail size={16} />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleEditEstimate(estimate)}
                      title="Edit Estimate"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleConvertToInvoice(estimate)}
                      title="Convert to Invoice"
                    >
                      <FileText size={16} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteEstimate(estimate.id)}
                      title="Delete Estimate"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Estimate Preview Modal */}
      {showPreview && previewEstimate && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Estimate Preview - {previewEstimate.estimateNumber}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowPreview(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="estimate-preview">
                <div className="preview-header">
                  <h2>ESTIMATE</h2>
                  <div className="preview-info">
                    <p><strong>Estimate #:</strong> {previewEstimate.estimateNumber}</p>
                    <p><strong>Date:</strong> {new Date(previewEstimate.createdAt).toLocaleDateString()}</p>
                    <p><strong>Valid Until:</strong> {previewEstimate.validUntil ? new Date(previewEstimate.validUntil).toLocaleDateString() : '30 days'}</p>
                  </div>
                </div>
                
                <div className="preview-client">
                  <h4>Bill To:</h4>
                  <p><strong>{previewEstimate.clientName}</strong></p>
                  <p>{previewEstimate.clientEmail}</p>
                  {previewEstimate.clientCompany && <p>{previewEstimate.clientCompany}</p>}
                  {previewEstimate.clientAddress && <p>{previewEstimate.clientAddress}</p>}
                </div>
                
                {previewEstimate.title && (
                  <div className="preview-project">
                    <h4>Project:</h4>
                    <p>{previewEstimate.title}</p>
                    {previewEstimate.description && <p>{previewEstimate.description}</p>}
                  </div>
                )}
                
                <div className="preview-items">
                  <table>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewEstimate.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>${item.rate}</td>
                          <td>${item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="preview-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${previewEstimate.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>${previewEstimate.tax.toFixed(2)}</span>
                  </div>
                  <div className="total-row final">
                    <span><strong>Total:</strong></span>
                    <span><strong>${previewEstimate.total.toFixed(2)}</strong></span>
                  </div>
                </div>
                
                {previewEstimate.notes && (
                  <div className="preview-notes">
                    <h4>Notes:</h4>
                    <p>{previewEstimate.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowPreview(false)}
              >
                Close
              </button>
              <button 
                className="btn-secondary"
                onClick={() => handleDownloadEstimate(previewEstimate)}
              >
                <Download size={16} />
                Download PDF
              </button>
              <button 
                className="btn-primary"
                onClick={() => handleSendEstimateEmail(previewEstimate)}
              >
                <Mail size={16} />
                Send via Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && previewEstimate && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Send Estimate via Email</h3>
              <button 
                className="modal-close"
                onClick={() => setShowEmailModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>To</label>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                  placeholder="client@example.com"
                />
              </div>
              
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  placeholder="Estimate subject line"
                />
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  rows="6"
                  placeholder="Your message to the client..."
                />
              </div>
              
              <div className="email-preview">
                <h4>Estimate Details:</h4>
                <p><strong>Estimate #:</strong> {previewEstimate.estimateNumber}</p>
                <p><strong>Client:</strong> {previewEstimate.clientName}</p>
                <p><strong>Total Amount:</strong> ${previewEstimate.total.toFixed(2)}</p>
                <p><strong>Valid Until:</strong> {previewEstimate.validUntil ? new Date(previewEstimate.validUntil).toLocaleDateString() : '30 days'}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowEmailModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSendEmail}
              >
                <Send size={16} />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EstimatesPage;
