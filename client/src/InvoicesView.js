import React, { useState, useEffect } from 'react';
import { FileText, Mail, Eye, DollarSign, Download, Trash2, Edit } from 'lucide-react';

function InvoicesView() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/invoices');
      const data = await response.json();
      setInvoices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setLoading(false);
    }
  };

  const sendInvoice = async (invoiceId, clientEmail) => {
    if (!window.confirm(`Send invoice to ${clientEmail}?`)) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}/send`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.previewUrl) {
        alert('Invoice sent! Check console for preview URL.');
        console.log('📧 Email preview:', data.previewUrl);
        window.open(data.previewUrl, '_blank');
      } else {
        alert('Invoice sent successfully!');
      }
    } catch (error) {
      alert('Error sending invoice: ' + error.message);
    }
  };

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  // Download invoice as PDF
  const downloadInvoice = async (invoice) => {
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoice.id}/download`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${invoice.invoice_number || invoice.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback: generate PDF on client side
        generateClientSidePDF(invoice);
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      // Fallback: generate PDF on client side
      generateClientSidePDF(invoice);
    }
  };

  // Generate PDF on client side (fallback)
  const generateClientSidePDF = (invoice) => {
    const pdfContent = `
      INVOICE ${invoice.invoice_number || `#${invoice.id}`}
      
      Date: ${new Date(invoice.created_at).toLocaleDateString()}
      Due Date: ${new Date(invoice.due_date).toLocaleDateString()}
      
      Bill To:
      ${invoice.client_name}
      ${invoice.client_email}
      ${invoice.client_address || ''}
      
      Amount: $${parseFloat(invoice.total || invoice.amount || 0).toFixed(2)}
      Status: ${invoice.status}
      
      Payment Terms: ${invoice.payment_terms || 'Due on Receipt'}
      
      Notes: ${invoice.notes || 'Thank you for your business!'}
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoice.invoice_number || invoice.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Delete invoice
  const deleteInvoice = async (invoiceId) => {
    if (!window.confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setInvoices(invoices.filter(inv => inv.id !== invoiceId));
        alert('Invoice deleted successfully!');
      } else {
        alert('Error deleting invoice');
      }
    } catch (error) {
      alert('Error deleting invoice: ' + error.message);
    }
  };

  // Calculate stats
  const totalInvoiced = invoices.reduce((sum, inv) => sum + parseFloat(inv.total || inv.amount || 0), 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const unpaidInvoices = invoices.filter(inv => inv.status === 'unpaid');
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + parseFloat(inv.total || inv.amount || 0), 0);
  const totalUnpaid = unpaidInvoices.reduce((sum, inv) => sum + parseFloat(inv.total || inv.amount || 0), 0);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Invoiced</p>
            <h3 className="stat-value">${totalInvoiced.toFixed(2)}</h3>
            <p className="stat-subtitle">{invoices.length} invoices</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Paid</p>
            <h3 className="stat-value">${totalPaid.toFixed(2)}</h3>
            <p className="stat-subtitle">{paidInvoices.length} invoices</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <Mail size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Unpaid</p>
            <h3 className="stat-value">${totalUnpaid.toFixed(2)}</h3>
            <p className="stat-subtitle">{unpaidInvoices.length} invoices</p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="table-container">
        <div className="table-header">
          <h2>Recent Invoices</h2>
        </div>

        {invoices.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>No invoices yet. Create your first one!</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <span className="invoice-number">
                      {invoice.invoice_number || `#${invoice.id}`}
                    </span>
                  </td>
                  <td>
                    <div className="client-info">
                      <div className="client-name">{invoice.client_name}</div>
                      <div className="client-email">{invoice.client_email}</div>
                    </div>
                  </td>
                  <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                  <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td className="amount">${parseFloat(invoice.total || invoice.amount || 0).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${invoice.status}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => viewInvoice(invoice)}
                        className="btn-icon"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => downloadInvoice(invoice)}
                        className="btn-icon"
                        title="Download PDF"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => sendInvoice(invoice.id, invoice.client_email)}
                        className="btn-icon"
                        title="Send Invoice"
                      >
                        <Mail size={16} />
                      </button>
                      <button
                        onClick={() => deleteInvoice(invoice.id)}
                        className="btn-icon delete"
                        title="Delete Invoice"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Invoice Details</h2>
              <button onClick={closeModal} className="btn-close">✕</button>
            </div>

            <div className="modal-body">
              <div className="invoice-detail-grid">
                <div>
                  <label>Invoice Number</label>
                  <p>{selectedInvoice.invoice_number || `#${selectedInvoice.id}`}</p>
                </div>
                <div>
                  <label>Status</label>
                  <span className={`status-badge ${selectedInvoice.status}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <label>Client</label>
                  <p>{selectedInvoice.client_name}</p>
                  <p className="text-sm">{selectedInvoice.client_email}</p>
                </div>
                <div>
                  <label>Due Date</label>
                  <p>{new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Line Items */}
              {selectedInvoice.items && selectedInvoice.items.length > 0 && (
                <div className="items-section">
                  <h3>Items</h3>
                  <table className="items-table-modal">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                          <td>${parseFloat(item.amount).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Totals */}
              <div className="invoice-totals">
                {selectedInvoice.subtotal && (
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${parseFloat(selectedInvoice.subtotal).toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoice.discount > 0 && (
                  <div className="total-row">
                    <span>Discount:</span>
                    <span>-${parseFloat(selectedInvoice.discount).toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoice.tax_amount > 0 && (
                  <div className="total-row">
                    <span>Tax ({selectedInvoice.tax_rate}%):</span>
                    <span>${parseFloat(selectedInvoice.tax_amount).toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row final">
                  <span>Total:</span>
                  <span>${parseFloat(selectedInvoice.total || selectedInvoice.amount).toFixed(2)}</span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div className="notes-section">
                  <label>Notes</label>
                  <p>{selectedInvoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoicesView;