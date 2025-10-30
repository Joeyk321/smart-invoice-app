import React, { useState, useEffect } from 'react';
import { Eye, Download, Edit, Star, Check, Palette, Upload, Save, ArrowLeft, Globe, Zap, User, History } from 'lucide-react';
import InvoiceGenerator from './InvoiceGenerator';
import TemplateAPI from './TemplateAPI';

// Unique Invoice Preview Component with different layouts
const InvoicePreview = ({ template }) => {
  const getTemplateData = (templateName) => {
    switch (templateName) {
      case 'Modern Professional':
        return {
          layout: 'modern',
          company: 'TechFlow Solutions',
          address: '456 Innovation Drive, San Francisco, CA 94105',
          client: 'Global Enterprises Inc.',
          clientEmail: 'billing@globalent.com',
          clientAddress: '789 Corporate Plaza, New York, NY 10001',
          items: [
            { desc: 'Web Development Services', qty: 40, rate: 125, amount: 5000 },
            { desc: 'UI/UX Design', qty: 15, rate: 100, amount: 1500 }
          ],
          subtotal: 6500,
          tax: 520,
          total: 7020,
          colors: { primary: '#10b981', secondary: '#059669' },
          font: 'Inter, sans-serif'
        };
      case 'Classic Corporate':
        return {
          layout: 'corporate',
          company: 'Anderson & Associates',
          address: '123 Business Center, Suite 200, Chicago, IL 60601',
          client: 'Metro Construction Group',
          clientEmail: 'accounts@metroconstruction.com',
          clientAddress: '555 Industrial Blvd, Detroit, MI 48201',
          items: [
            { desc: 'Legal Consultation', qty: 8, rate: 300, amount: 2400 },
            { desc: 'Contract Review', qty: 3, rate: 200, amount: 600 },
            { desc: 'Documentation', qty: 5, rate: 150, amount: 750 }
          ],
          subtotal: 3750,
          tax: 300,
          total: 4050,
          colors: { primary: '#1f2937', secondary: '#374151' },
          font: 'Georgia, serif'
        };
      case 'Creative Bold':
        return {
          layout: 'creative',
          company: 'PixelCraft Studio',
          address: '987 Creative Lane, Los Angeles, CA 90210',
          client: 'StartupXYZ',
          clientEmail: 'hello@startupxyz.com',
          clientAddress: '321 Innovation Hub, Austin, TX 78701',
          items: [
            { desc: 'Brand Identity Design', qty: 1, rate: 2500, amount: 2500 },
            { desc: 'Marketing Materials', qty: 12, rate: 150, amount: 1800 },
            { desc: 'Social Media Kit', qty: 1, rate: 800, amount: 800 }
          ],
          subtotal: 5100,
          tax: 408,
          total: 5508,
          colors: { primary: '#8b5cf6', secondary: '#7c3aed' },
          font: 'Poppins, sans-serif'
        };
      case 'Healthcare Professional':
        return {
          layout: 'healthcare',
          company: 'MedCare Clinic',
          address: '456 Health Plaza, Medical District, Boston, MA 02118',
          client: 'John Smith',
          clientEmail: 'john.smith@email.com',
          clientAddress: '789 Patient Ave, Boston, MA 02120',
          items: [
            { desc: 'General Consultation', qty: 1, rate: 200, amount: 200 },
            { desc: 'Lab Tests', qty: 3, rate: 85, amount: 255 },
            { desc: 'Prescription Review', qty: 1, rate: 50, amount: 50 }
          ],
          subtotal: 505,
          tax: 0,
          total: 505,
          colors: { primary: '#3b82f6', secondary: '#1d4ed8' },
          font: 'Inter, sans-serif'
        };
      case 'Legal Formal':
        return {
          layout: 'legal',
          company: 'Blackstone Legal Group',
          address: '1000 Justice Tower, Suite 1500, Washington, DC 20001',
          client: 'Corporate Client LLC',
          clientEmail: 'legal@corporateclient.com',
          clientAddress: '2000 Business Center, Washington, DC 20002',
          items: [
            { desc: 'Legal Research (15 hours)', qty: 15, rate: 400, amount: 6000 },
            { desc: 'Document Drafting', qty: 1, rate: 1200, amount: 1200 },
            { desc: 'Court Filing Fees', qty: 1, rate: 350, amount: 350 }
          ],
          subtotal: 7550,
          tax: 0,
          total: 7550,
          colors: { primary: '#dc2626', secondary: '#b91c1c' },
          font: 'Times New Roman, serif'
        };
      default:
        return {
          layout: 'modern',
          company: 'Your Company',
          address: '123 Business St, City, State 12345',
          client: 'Client Name',
          clientEmail: 'client@email.com',
          clientAddress: '456 Client Ave, City, State',
          items: [
            { desc: 'Professional Services', qty: 1, rate: 500, amount: 500 },
            { desc: 'Consultation', qty: 2, rate: 150, amount: 300 }
          ],
          subtotal: 800,
          tax: 64,
          total: 864,
          colors: { primary: '#10b981', secondary: '#059669' },
          font: 'Inter, sans-serif'
        };
    }
  };

  const data = getTemplateData(template.name);

  const renderModernLayout = () => (
    <div className="invoice-preview-container modern-layout" style={{ fontFamily: data.font }}>
      <div className="invoice-preview-header" style={{ background: data.colors.primary, color: 'white' }}>
        <div className="invoice-preview-company">
          <h3>{data.company}</h3>
          <p>{data.address}</p>
        </div>
        <div className="invoice-preview-title">
          <h2>INVOICE</h2>
          <p>#INV-2024-001</p>
        </div>
      </div>
      
      <div className="invoice-preview-body">
        <div className="invoice-preview-client">
          <h4>Bill To:</h4>
          <p>{data.client}<br />
          {data.clientEmail}<br />
          {data.clientAddress}</p>
        </div>
        
        <div className="invoice-preview-details">
          <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Due:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="invoice-preview-items">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Hours</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.qty}</td>
                <td>${item.rate}</td>
                <td>${item.amount}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="invoice-preview-totals">
        <div className="invoice-preview-subtotal">
          <p>Subtotal: ${data.subtotal}</p>
          {data.tax > 0 && <p>Tax (8%): ${data.tax}</p>}
          <p style={{ color: data.colors.primary, fontWeight: 'bold' }}>Total: ${data.total}</p>
        </div>
      </div>
    </div>
  );

  const renderCorporateLayout = () => (
    <div className="invoice-preview-container corporate-layout" style={{ fontFamily: data.font }}>
      <div className="corporate-header">
        <div className="corporate-logo">
          <div className="logo-circle" style={{ background: data.colors.primary }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>A&A</span>
          </div>
        </div>
        <div className="corporate-title">
          <h2 style={{ color: data.colors.primary }}>STATEMENT OF SERVICES</h2>
          <p>Invoice #: INV-2024-002</p>
        </div>
      </div>
      
      <div className="corporate-body">
        <div className="corporate-client-section">
          <h4 style={{ color: data.colors.primary }}>CLIENT INFORMATION</h4>
          <p><strong>{data.client}</strong><br />
          {data.clientEmail}<br />
          {data.clientAddress}</p>
        </div>
        
        <div className="corporate-details">
          <div className="detail-row">
            <span>Service Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span>Payment Due:</span>
            <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="corporate-items">
        <table>
          <thead>
            <tr style={{ background: data.colors.primary, color: 'white' }}>
              <th>SERVICE DESCRIPTION</th>
              <th>UNITS</th>
              <th>RATE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.qty}</td>
                <td>${item.rate}</td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="corporate-totals">
        <div className="total-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${data.subtotal}</span>
          </div>
          {data.tax > 0 && (
            <div className="total-row">
              <span>Tax:</span>
              <span>${data.tax}</span>
            </div>
          )}
          <div className="total-row final-total" style={{ color: data.colors.primary }}>
            <span><strong>TOTAL AMOUNT DUE:</strong></span>
            <span><strong>${data.total}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreativeLayout = () => (
    <div className="invoice-preview-container creative-layout" style={{ fontFamily: data.font }}>
      <div className="creative-header" style={{ background: `linear-gradient(135deg, ${data.colors.primary} 0%, ${data.colors.secondary} 100%)` }}>
        <div className="creative-brand">
          <div className="brand-icon" style={{ background: 'white', color: data.colors.primary }}>
            <span style={{ fontWeight: 'bold' }}>PC</span>
          </div>
          <div className="brand-info">
            <h3 style={{ color: 'white' }}>{data.company}</h3>
            <p style={{ color: 'white', opacity: 0.9 }}>{data.address}</p>
          </div>
        </div>
        <div className="creative-invoice-title">
          <h2 style={{ color: 'white', fontSize: '24px' }}>INVOICE</h2>
          <p style={{ color: 'white', opacity: 0.9 }}>#{data.client.slice(0, 3).toUpperCase()}-2024-003</p>
        </div>
      </div>
      
      <div className="creative-body">
        <div className="creative-client">
          <div className="client-label" style={{ color: data.colors.primary }}>BILL TO</div>
          <div className="client-info">
            <h4>{data.client}</h4>
            <p>{data.clientEmail}</p>
            <p>{data.clientAddress}</p>
          </div>
        </div>
        
        <div className="creative-meta">
          <div className="meta-item">
            <span className="meta-label" style={{ color: data.colors.primary }}>Date</span>
            <span className="meta-value">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label" style={{ color: data.colors.primary }}>Due Date</span>
            <span className="meta-value">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="creative-items">
        <div className="items-header" style={{ background: data.colors.primary, color: 'white' }}>
          <div>DESCRIPTION</div>
          <div>QTY</div>
          <div>PRICE</div>
          <div>TOTAL</div>
        </div>
        {data.items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="item-desc">{item.desc}</div>
            <div className="item-qty">{item.qty}</div>
            <div className="item-price">${item.rate}</div>
            <div className="item-total">${item.amount}</div>
          </div>
        ))}
      </div>
      
      <div className="creative-totals">
        <div className="totals-container">
          <div className="total-line">
            <span>Subtotal</span>
            <span>${data.subtotal}</span>
          </div>
          {data.tax > 0 && (
            <div className="total-line">
              <span>Tax</span>
              <span>${data.tax}</span>
            </div>
          )}
          <div className="total-line final" style={{ color: data.colors.primary }}>
            <span><strong>TOTAL</strong></span>
            <span><strong>${data.total}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealthcareLayout = () => (
    <div className="invoice-preview-container healthcare-layout" style={{ fontFamily: data.font }}>
      <div className="healthcare-header">
        <div className="healthcare-logo">
          <div className="medical-icon" style={{ background: data.colors.primary }}>
            <span style={{ color: 'white' }}>+</span>
          </div>
          <div className="healthcare-info">
            <h3 style={{ color: data.colors.primary }}>{data.company}</h3>
            <p>{data.address}</p>
          </div>
        </div>
        <div className="healthcare-title">
          <h2 style={{ color: data.colors.primary }}>MEDICAL BILL</h2>
          <p>Account #: {data.client.slice(0, 3).toUpperCase()}-2024-004</p>
        </div>
      </div>
      
      <div className="healthcare-patient">
        <h4 style={{ color: data.colors.primary }}>PATIENT INFORMATION</h4>
        <div className="patient-details">
          <div className="patient-info">
            <p><strong>Name:</strong> {data.client}</p>
            <p><strong>Email:</strong> {data.clientEmail}</p>
            <p><strong>Address:</strong> {data.clientAddress}</p>
          </div>
          <div className="visit-info">
            <p><strong>Visit Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div className="healthcare-services">
        <h4 style={{ color: data.colors.primary }}>SERVICES PROVIDED</h4>
        <table>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th>Service</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.qty}</td>
                <td>${item.rate}</td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="healthcare-totals">
        <div className="totals-summary">
          <div className="total-item">
            <span>Subtotal:</span>
            <span>${data.subtotal}</span>
          </div>
          {data.tax > 0 && (
            <div className="total-item">
              <span>Tax:</span>
              <span>${data.tax}</span>
            </div>
          )}
          <div className="total-item final" style={{ color: data.colors.primary }}>
            <span><strong>Amount Due:</strong></span>
            <span><strong>${data.total}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLegalLayout = () => (
    <div className="invoice-preview-container legal-layout" style={{ fontFamily: data.font }}>
      <div className="legal-header">
        <div className="legal-firm">
          <h3 style={{ color: data.colors.primary }}>{data.company}</h3>
          <p>{data.address}</p>
        </div>
        <div className="legal-title">
          <h2 style={{ color: data.colors.primary }}>LEGAL SERVICES INVOICE</h2>
          <p>Invoice No: INV-2024-005</p>
        </div>
      </div>
      
      <div className="legal-client">
        <h4 style={{ color: data.colors.primary }}>CLIENT</h4>
        <p><strong>{data.client}</strong><br />
        {data.clientEmail}<br />
        {data.clientAddress}</p>
      </div>
      
      <div className="legal-details">
        <div className="legal-meta">
          <p><strong>Date of Service:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Payment Terms:</strong> Net 30 days</p>
          <p><strong>Due Date:</strong> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="legal-services">
        <h4 style={{ color: data.colors.primary }}>LEGAL SERVICES RENDERED</h4>
        <table>
          <thead>
            <tr style={{ background: data.colors.primary, color: 'white' }}>
              <th>DESCRIPTION OF SERVICES</th>
              <th>HOURS</th>
              <th>HOURLY RATE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.qty}</td>
                <td>${item.rate}</td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="legal-totals">
        <div className="legal-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${data.subtotal}</span>
          </div>
          {data.tax > 0 && (
            <div className="summary-row">
              <span>Tax:</span>
              <span>${data.tax}</span>
            </div>
          )}
          <div className="summary-row total" style={{ color: data.colors.primary }}>
            <span><strong>TOTAL FEES:</strong></span>
            <span><strong>${data.total}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (data.layout) {
    case 'corporate':
      return renderCorporateLayout();
    case 'creative':
      return renderCreativeLayout();
    case 'healthcare':
      return renderHealthcareLayout();
    case 'legal':
      return renderLegalLayout();
    default:
      return renderModernLayout();
  }
};

function TemplateGallery({ onNavigateToView }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizationMode, setCustomizationMode] = useState(false);
  const [generatorMode, setGeneratorMode] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customization, setCustomization] = useState({
    logo: null,
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    font: 'Inter',
    companyName: 'Your Company',
    tagline: 'Professional Services'
  });

  // Load professional templates from API
  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);
      try {
        const apiTemplates = await TemplateAPI.getProfessionalTemplates();
        setTemplates(apiTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
        // Fallback to basic templates
        setTemplates(TemplateAPI.getFallbackTemplates());
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const categories = TemplateAPI.getCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomizationMode(true);
  };

  const handleCustomizationChange = (field, value) => {
    setCustomization(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveTemplate = () => {
    // Save customized template logic here
    alert('Template customized and saved successfully!');
    setCustomizationMode(false);
    setSelectedTemplate(null);
  };

  const handleGenerateInvoice = async (template) => {
    try {
      const invoiceData = {
        to: 'Client Company Inc.',
        from: customization.companyName || 'Your Business Name',
        currency: 'usd',
        number: `INV-${Date.now().toString().slice(-6)}`,
        logo: customization.logo || 'https://via.placeholder.com/150x50/10b981/ffffff?text=LOGO',
        items: [
          {
            name: 'Professional Services',
            quantity: 1,
            unit_cost: 500
          },
          {
            name: 'Consultation',
            quantity: 2,
            unit_cost: 150
          }
        ],
        fields: {
          tax: '10%',
          discount: '5%'
        },
        notes: 'Thank you for your business!',
        terms: 'Payment due within 30 days.'
      };

      const result = await TemplateAPI.generateAndDownloadInvoice(template.apiId, invoiceData);
      
      if (result.success) {
        alert('Invoice generated and downloaded successfully!');
      } else {
        alert('Failed to generate invoice. Please try again.');
      }
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('An error occurred while generating the invoice.');
    }
  };

  const handleBackToTemplates = () => {
    setGeneratorMode(false);
    setSelectedTemplate(null);
  };

  // Smart Auto-Fill Functions
  const autoFillFromProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setCustomization(prev => ({
      ...prev,
      companyName: userProfile.companyName || 'Your Company',
      email: userProfile.email || 'your@email.com',
      phone: userProfile.phone || '+1 (555) 123-4567',
      address: userProfile.address || '123 Business St, City, State 12345'
    }));
  };

  const autoFillFromLastInvoice = () => {
    const lastInvoice = JSON.parse(localStorage.getItem('lastInvoice') || '{}');
    setCustomization(prev => ({
      ...prev,
      clientName: lastInvoice.clientName || '',
      clientEmail: lastInvoice.clientEmail || '',
      clientAddress: lastInvoice.clientAddress || '',
      lineItems: lastInvoice.lineItems || []
    }));
  };

  const smartFillTemplate = async (template) => {
    if (!template.autoFill) return;
    
    // Auto-fill based on template smart fields
    const smartData = {};
    
    if (template.smartFields.includes('company-name')) {
      smartData.companyName = localStorage.getItem('companyName') || 'Your Company';
    }
    
    if (template.smartFields.includes('client-info')) {
      const lastClient = JSON.parse(localStorage.getItem('lastClient') || '{}');
      smartData.clientName = lastClient.name || '';
      smartData.clientEmail = lastClient.email || '';
    }
    
    if (template.smartFields.includes('line-items')) {
      const commonItems = JSON.parse(localStorage.getItem('commonItems') || '[]');
      smartData.lineItems = commonItems.slice(0, 3); // First 3 common items
    }
    
    setCustomization(prev => ({ ...prev, ...smartData }));
  };

  // API Integration Functions
  const loadTemplateFromAPI = async (template) => {
    try {
      let apiResponse;
      
      switch (template.source) {
        case 'microsoft-word':
          apiResponse = await fetch(`${template.apiUrl}?filter=name eq '${template.apiId}'`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('microsoft_token')}`,
              'Content-Type': 'application/json'
            }
          });
          break;
          
        case 'google-docs':
          apiResponse = await fetch(`${template.apiUrl}/${template.apiId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('google_token')}`,
              'Content-Type': 'application/json'
            }
          });
          break;
          
        case 'canva':
          apiResponse = await fetch(`${template.apiUrl}/${template.apiId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('canva_token')}`,
              'Content-Type': 'application/json'
            }
          });
          break;
          
        default:
          throw new Error('Unknown template source');
      }
      
      if (apiResponse.ok) {
        const templateData = await apiResponse.json();
        console.log('Template loaded from API:', templateData);
        return templateData;
      } else {
        throw new Error('Failed to load template from API');
      }
    } catch (error) {
      console.error('Error loading template from API:', error);
      alert('Failed to load template. Please check your API credentials.');
    }
  };

  const saveTemplateToAPI = async (template, customizations) => {
    try {
      const templateData = {
        ...template,
        customizations,
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch('/api/templates/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData)
      });
      
      if (response.ok) {
        console.log('Template saved successfully');
        return true;
      } else {
        throw new Error('Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template. Please try again.');
      return false;
    }
  };

  // Show Invoice Generator if in generator mode
  if (generatorMode && selectedTemplate) {
    return (
      <InvoiceGenerator 
        onBackToDashboard={handleBackToTemplates}
        template={selectedTemplate}
        invoiceData={customization}
      />
    );
  }

  return (
    <div className="template-gallery">
             <div className="template-header">
               <button className="back-btn" onClick={() => onNavigateToView('dashboard')}>
                 <ArrowLeft size={20} />
                 Back to Dashboard
               </button>
               <h1>Professional Invoice Templates</h1>
               <p>Choose from real professional templates like QuickBooks and generate beautiful PDF invoices</p>
             </div>

             {loading && (
               <div className="loading-templates">
                 <div className="spinner"></div>
                 <p>Loading professional templates...</p>
               </div>
             )}

      {!customizationMode ? (
        <>
          <div className="template-filters">
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="template-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-preview">
                  <div className="template-image">
                    <div className="invoice-preview">
                      <InvoicePreview template={template} />
                    </div>
                    <div className="template-overlay">
                      <button 
                        className="preview-btn"
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <Eye size={20} />
                        Preview
                      </button>
                      <button 
                        className="preview-btn"
                        onClick={() => handleGenerateInvoice(template)}
                      >
                        <Download size={20} />
                        Generate Invoice
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="template-info">
                  <div className="template-header-info">
                    <h3>{template.name}</h3>
                    <span className="template-category">{template.category}</span>
                  </div>
                  
                  <p className="template-description">{template.description}</p>
                  
                  <div className="template-features">
                    {template.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  
                  <div className="template-stats">
                    <div className="template-rating">
                      <Star size={16} fill="currentColor" />
                      <span>{template.rating}</span>
                    </div>
                    <div className="template-downloads">
                      <Download size={16} />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  
                  <div className="template-actions">
                    <button 
                      className="btn-primary"
                      onClick={() => handleGenerateInvoice(template)}
                    >
                      <Edit size={20} />
                      Generate Invoice
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => {
                        handleTemplateSelect(template);
                        smartFillTemplate(template);
                      }}
                    >
                      <Palette size={20} />
                      Customize
                    </button>
                    {template.autoFill && (
                      <button 
                        className="btn-smart"
                        onClick={() => smartFillTemplate(template)}
                        title="Auto-fill with your data"
                      >
                        <Zap size={20} />
                        Auto Fill
                      </button>
                    )}
                    <button className="btn-secondary">
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="template-customization">
          <div className="customization-header">
            <h2>Customize Template: {selectedTemplate?.name}</h2>
            <div className="customization-actions">
              <button 
                className="btn-secondary"
                onClick={() => setCustomizationMode(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveTemplate}>
                <Save size={20} />
                Save Template
              </button>
            </div>
          </div>

          <div className="customization-container">
            <div className="customization-sidebar">
              <div className="customization-section">
                <h3>Branding</h3>
                
                {/* Smart Fill Buttons */}
                <div className="smart-fill-buttons">
                  <button 
                    className="btn-smart-fill"
                    onClick={autoFillFromProfile}
                    title="Fill with your profile data"
                  >
                    <User size={16} />
                    Fill from Profile
                  </button>
                  <button 
                    className="btn-smart-fill"
                    onClick={autoFillFromLastInvoice}
                    title="Fill with last invoice data"
                  >
                    <History size={16} />
                    Fill from Last Invoice
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Company Logo</label>
                  <div className="file-upload" onClick={() => document.getElementById('logo-upload').click()}>
                    <Upload size={20} />
                    <span>{customization.logo ? 'Change Logo' : 'Upload Logo'}</span>
                    <input 
                      id="logo-upload"
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleCustomizationChange('logo', e.target.files[0])}
                    />
                  </div>
                  {customization.logo && (
                    <div className="logo-preview">
                      <img src={URL.createObjectURL(customization.logo)} alt="Logo preview" />
                      <button 
                        type="button"
                        onClick={() => handleCustomizationChange('logo', null)}
                        className="remove-logo-btn"
                      >
                        Remove Logo
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={customization.companyName}
                    onChange={(e) => handleCustomizationChange('companyName', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    value={customization.tagline}
                    onChange={(e) => handleCustomizationChange('tagline', e.target.value)}
                  />
                </div>
              </div>

              <div className="customization-section">
                <h3>Colors</h3>
                <div className="form-group">
                  <label>Primary Color</label>
                  <div className="color-input">
                    <input
                      type="color"
                      value={customization.primaryColor}
                      onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                    />
                    <span>{customization.primaryColor}</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Secondary Color</label>
                  <div className="color-input">
                    <input
                      type="color"
                      value={customization.secondaryColor}
                      onChange={(e) => handleCustomizationChange('secondaryColor', e.target.value)}
                    />
                    <span>{customization.secondaryColor}</span>
                  </div>
                </div>
              </div>

              <div className="customization-section">
                <h3>Typography</h3>
                <div className="form-group">
                  <label>Font Family</label>
                  <select
                    value={customization.font}
                    onChange={(e) => handleCustomizationChange('font', e.target.value)}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="customization-preview">
              <div className="preview-container">
                <div className="template-preview-paper">
                  <div className="preview-header" style={{ backgroundColor: customization.primaryColor }}>
                    <div className="preview-logo">
                      {customization.logo ? (
                        <img src={URL.createObjectURL(customization.logo)} alt="Logo" />
                      ) : (
                        <div className="logo-placeholder">LOGO</div>
                      )}
                    </div>
                    <div className="preview-company">
                      <h2 style={{ fontFamily: customization.font }}>{customization.companyName}</h2>
                      <p style={{ fontFamily: customization.font }}>{customization.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="preview-content">
                    <div className="preview-invoice-details">
                      <h3>INVOICE</h3>
                      <div className="preview-details">
                        <div className="preview-detail">
                          <span>Invoice #:</span>
                          <span>INV-001</span>
                        </div>
                        <div className="preview-detail">
                          <span>Date:</span>
                          <span>January 15, 2024</span>
                        </div>
                        <div className="preview-detail">
                          <span>Due Date:</span>
                          <span>February 15, 2024</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="preview-items">
                      <div className="preview-item">
                        <span>Web Development Services</span>
                        <span>$2,500.00</span>
                      </div>
                      <div className="preview-item">
                        <span>Design Services</span>
                        <span>$1,200.00</span>
                      </div>
                    </div>
                    
                    <div className="preview-total" style={{ backgroundColor: customization.secondaryColor }}>
                      <span>Total</span>
                      <span>$3,700.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateGallery;
