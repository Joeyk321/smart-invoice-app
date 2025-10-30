import React, { useState } from 'react';
import easyinvoice from 'easyinvoice';
import { Download, Mail, Eye, ArrowLeft, Save, Send } from 'lucide-react';

function InvoiceGenerator({ onBackToDashboard, template, invoiceData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Template configurations for EasyInvoice
  const getTemplateConfig = (templateName) => {
    const templates = {
      'Modern Professional': {
        color: '#10b981',
        font: 'Helvetica',
        fontSize: 12,
        header: {
          color: '#10b981',
          fontSize: 24,
          fontWeight: 'bold'
        }
      },
      'Classic Business': {
        color: '#1f2937',
        font: 'Times',
        fontSize: 12,
        header: {
          color: '#1f2937',
          fontSize: 22,
          fontWeight: 'bold'
        }
      },
      'Bold Creative': {
        color: '#8b5cf6',
        font: 'Arial',
        fontSize: 12,
        header: {
          color: '#8b5cf6',
          fontSize: 26,
          fontWeight: 'bold'
        }
      }
    };
    return templates[templateName] || templates['Modern Professional'];
  };

  const generateInvoice = async () => {
    setIsGenerating(true);
    
    try {
      const templateConfig = getTemplateConfig(template?.name || 'Modern Professional');
      
      const data = {
        // Customize invoice
        "customize": {
          "template": templateConfig.color
        },
        "images": {
          // Logo image
          "logo": "https://via.placeholder.com/150x50/10b981/ffffff?text=QuickInvoice",
          // Background image
          "background": "https://via.placeholder.com/400x600/f8fafc/10b981?text=Invoice"
        },
        "sender": {
          "company": invoiceData?.companyName || "Your Company",
          "address": invoiceData?.address || "123 Business Street",
          "zip": invoiceData?.zip || "12345",
          "city": invoiceData?.city || "Business City",
          "country": invoiceData?.country || "United States",
          "phone": invoiceData?.phone || "+1 (555) 123-4567",
          "email": invoiceData?.email || "billing@yourcompany.com",
          "website": invoiceData?.website || "www.yourcompany.com"
        },
        "client": {
          "company": invoiceData?.clientName || "Client Company",
          "address": invoiceData?.clientAddress || "456 Client Avenue",
          "zip": invoiceData?.clientZip || "54321",
          "city": invoiceData?.clientCity || "Client City",
          "country": invoiceData?.clientCountry || "United States",
          "phone": invoiceData?.clientPhone || "+1 (555) 987-6543",
          "email": invoiceData?.clientEmail || "client@company.com"
        },
        "information": {
          "number": invoiceData?.invoiceNumber || "INV-001",
          "date": invoiceData?.date || new Date().toLocaleDateString(),
          "due-date": invoiceData?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        },
        "products": invoiceData?.lineItems || [
          {
            "quantity": "1",
            "description": "Professional Services",
            "tax-rate": 8,
            "price": 500.00
          },
          {
            "quantity": "2",
            "description": "Consultation",
            "tax-rate": 8,
            "price": 150.00
          }
        ],
        "bottom-notice": invoiceData?.notes || "Thank you for your business!",
        "settings": {
          "currency": "USD",
          "tax-notation": "vat",
          "margin-top": 50,
          "margin-right": 50,
          "margin-left": 50,
          "margin-bottom": 50
        }
      };

      const result = await easyinvoice.createInvoice(data);
      setGeneratedPdf(result.pdf);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating invoice:', error);
      setIsGenerating(false);
      alert('Error generating invoice. Please try again.');
    }
  };

  const downloadInvoice = () => {
    if (generatedPdf) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${generatedPdf}`;
      link.download = `invoice-${invoiceData?.invoiceNumber || '001'}.pdf`;
      link.click();
    }
  };

  const emailInvoice = () => {
    if (generatedPdf && invoiceData?.clientEmail) {
      const subject = `Invoice ${invoiceData?.invoiceNumber || '001'} from ${invoiceData?.companyName || 'Your Company'}`;
      const body = `Dear ${invoiceData?.clientName || 'Client'},\n\nPlease find attached your invoice.\n\nThank you for your business!\n\nBest regards,\n${invoiceData?.companyName || 'Your Company'}`;
      
      const mailtoLink = `mailto:${invoiceData.clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink);
    } else {
      alert('Please enter client email address first.');
    }
  };

  return (
    <div className="invoice-generator">
      <div className="generator-header">
        <button 
          className="back-btn"
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={20} />
          Back to Templates
        </button>
        <h1>Generate Invoice</h1>
        <p>Create a professional PDF invoice using {template?.name || 'Modern Professional'} template</p>
      </div>

      <div className="generator-content">
        <div className="generator-preview">
          <h3>Template Preview</h3>
          <div className="template-preview-card">
            <div className="preview-header" style={{ backgroundColor: getTemplateConfig(template?.name).color }}>
              <h4>{invoiceData?.companyName || 'Your Company'}</h4>
              <h2>INVOICE</h2>
            </div>
            <div className="preview-body">
              <div className="preview-client">
                <strong>Bill To:</strong><br />
                {invoiceData?.clientName || 'Client Company'}<br />
                {invoiceData?.clientEmail || 'client@company.com'}
              </div>
              <div className="preview-details">
                <p><strong>Invoice #:</strong> {invoiceData?.invoiceNumber || 'INV-001'}</p>
                <p><strong>Date:</strong> {invoiceData?.date || new Date().toLocaleDateString()}</p>
                <p><strong>Due:</strong> {invoiceData?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              </div>
            </div>
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
                  {(invoiceData?.lineItems || []).map((item, index) => (
                    <tr key={index}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="preview-total">
              <p><strong>Total: ${invoiceData?.total || '864.00'}</strong></p>
            </div>
          </div>
        </div>

        <div className="generator-actions">
          <h3>Actions</h3>
          <div className="action-buttons">
            <button 
              className="btn-primary"
              onClick={generateInvoice}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="spinner"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Generate PDF
                </>
              )}
            </button>

            {generatedPdf && (
              <>
                <button 
                  className="btn-secondary"
                  onClick={downloadInvoice}
                >
                  <Download size={20} />
                  Download PDF
                </button>

                <button 
                  className="btn-secondary"
                  onClick={emailInvoice}
                >
                  <Mail size={20} />
                  Email Invoice
                </button>
              </>
            )}
          </div>

          <div className="generator-info">
            <h4>Template Features:</h4>
            <ul>
              <li>✅ Professional PDF generation</li>
              <li>✅ Customizable branding</li>
              <li>✅ Automatic calculations</li>
              <li>✅ Tax calculations</li>
              <li>✅ Download & email ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceGenerator;
