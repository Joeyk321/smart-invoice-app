import React, { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign, ArrowLeft, Upload, X } from 'lucide-react';

function CreateInvoice({ onNavigateToView, clientData }) {
  const [invoice, setInvoice] = useState({
    clientName: clientData?.name || '',
    clientEmail: clientData?.email || '',
    clientAddress: clientData?.address || '',
    dueDate: '',
    paymentTerms: 'Due on Receipt',
    taxRate: 0,
    discount: 0,
    notes: ''
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, unitPrice: 0 }
  ]);

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    taxId: '',
    website: ''
  });

  // Load client data from localStorage on component mount
  useEffect(() => {
    const selectedClient = localStorage.getItem('selectedClient');
    if (selectedClient) {
      const client = JSON.parse(selectedClient);
      setInvoice(prev => ({
        ...prev,
        clientName: client.name || '',
        clientEmail: client.email || '',
        clientAddress: client.address || ''
      }));
      // Clear the stored client data after using it
      localStorage.removeItem('selectedClient');
    }

    // Load business info from user data
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setBusinessInfo({
        companyName: user.companyName || '',
        businessAddress: user.businessAddress || '',
        businessPhone: user.businessPhone || '',
        businessEmail: user.businessEmail || '',
        taxId: user.taxId || '',
        website: user.website || ''
      });
    }

    // Load logo from localStorage
    const savedLogo = localStorage.getItem('businessLogo');
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }
  }, []);

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Logo upload functions
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoDataUrl = e.target.result;
        setLogoPreview(logoDataUrl);
        localStorage.setItem('businessLogo', logoDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    localStorage.removeItem('businessLogo');
  };

  const calculateItemTotal = (item) => {
    return (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() - parseFloat(invoice.discount || 0)) * (parseFloat(invoice.taxRate) / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() - parseFloat(invoice.discount || 0) + calculateTax();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate items
    if (items.some(item => !item.description || !item.quantity || !item.unitPrice)) {
      alert('Please fill in all item fields');
      return;
    }

    const invoiceData = {
      ...invoice,
      items: items.map(item => ({
        ...item,
        amount: calculateItemTotal(item)
      })),
      subtotal: calculateSubtotal(),
      taxAmount: calculateTax(),
      total: calculateTotal(),
      businessInfo: businessInfo,
      logo: logoPreview
    };

    try {
      const response = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      const data = await response.json();
      alert('Invoice created! ' + data.message);
      
      // Reset form
      setInvoice({
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        dueDate: '',
        paymentTerms: 'Due on Receipt',
        taxRate: 0,
        discount: 0,
        notes: ''
      });
      setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
      
      window.location.reload();
    } catch (error) {
      alert('Error creating invoice: ' + error.message);
    }
  };

  return (
    <div className="invoice-form-container">
      <div className="form-header">
        <button 
          type="button"
          className="back-btn"
          onClick={() => onNavigateToView('dashboard')}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Create New Invoice</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="invoice-form">
        
        {/* Logo Upload */}
        <div className="form-section">
          <h3 className="section-title">Company Logo</h3>
          <div className="logo-upload-section">
            <div className="logo-upload-area">
              {logoPreview ? (
                <div className="logo-preview-container">
                  <img src={logoPreview} alt="Company Logo" className="logo-preview" />
                  <button type="button" className="remove-logo-btn" onClick={removeLogo}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="file-upload" onClick={() => document.getElementById('logo-upload').click()}>
                  <Upload size={32} />
                  <p>Click to upload your company logo</p>
                  <p className="upload-hint">PNG, JPG up to 2MB</p>
                </div>
              )}
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="form-section">
          <h3 className="section-title">Client Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Client Name *</label>
              <input
                type="text"
                name="clientName"
                value={invoice.clientName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>Client Email *</label>
              <input
                type="email"
                name="clientEmail"
                value={invoice.clientEmail}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group full-width">
              <label>Client Address</label>
              <input
                type="text"
                name="clientAddress"
                value={invoice.clientAddress}
                onChange={handleChange}
                placeholder="123 Main St, City, State, ZIP"
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="form-section">
          <h3 className="section-title">Invoice Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                name="dueDate"
                value={invoice.dueDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Terms</label>
              <select
                name="paymentTerms"
                value={invoice.paymentTerms}
                onChange={handleChange}
              >
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Items / Services</h3>
            <button
              type="button"
              onClick={addItem}
              className="btn-add-item"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          <div className="items-table">
            <div className="items-header">
              <div>Description</div>
              <div>Qty</div>
              <div>Unit Price</div>
              <div>Amount</div>
              <div></div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="item-row">
                <input
                  type="text"
                  placeholder="Product or service description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="1"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  required
                />
                <div className="item-total">
                  ${calculateItemTotal(item).toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="btn-remove-item"
                  disabled={items.length === 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="form-section">
          <div className="totals-section">
            <div className="totals-left">
              <div className="form-group">
                <label>Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  min="0"
                  max="100"
                  step="0.01"
                  value={invoice.taxRate}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Discount ($)</label>
                <input
                  type="number"
                  name="discount"
                  min="0"
                  step="0.01"
                  value={invoice.discount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="totals-right">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              {parseFloat(invoice.discount) > 0 && (
                <div className="total-row discount">
                  <span>Discount:</span>
                  <span>-${parseFloat(invoice.discount).toFixed(2)}</span>
                </div>
              )}
              {parseFloat(invoice.taxRate) > 0 && (
                <div className="total-row">
                  <span>Tax ({invoice.taxRate}%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
              )}
              <div className="total-row final">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="form-section">
          <h3 className="section-title">Notes / Terms</h3>
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            placeholder="Payment terms, late fees, thank you note, etc."
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit">
          <DollarSign size={20} />
          Create Invoice
        </button>
      </form>
    </div>
  );
}

export default CreateInvoice;