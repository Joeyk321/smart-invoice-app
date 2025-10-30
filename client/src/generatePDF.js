const easyinvoice = require('easyinvoice');
const fs = require('fs');

const generateInvoicePDF = async (invoice, pdfPath, template = 'modern') => {
  try {
    // Template color schemes
    const templates = {
      modern: {
        color: "#3b82f6",
        accentColor: "#60a5fa"
      },
      classic: {
        color: "#1f2937",
        accentColor: "#6b7280"
      },
      bold: {
        color: "#7c3aed",
        accentColor: "#a78bfa"
      },
      minimal: {
        color: "#000000",
        accentColor: "#737373"
      },
      creative: {
        color: "#ec4899",
        accentColor: "#f472b6"
      },
      professional: {
        color: "#0f172a",
        accentColor: "#334155"
      }
    };

    const selectedTemplate = templates[template] || templates.modern;

    // Prepare items for easyinvoice format
    const products = invoice.items ? invoice.items.map(item => ({
      quantity: item.quantity,
      description: item.description,
      taxRate: 0,
      price: parseFloat(item.unit_price)
    })) : [{
      quantity: 1,
      description: invoice.description || 'Service',
      taxRate: 0,
      price: parseFloat(invoice.amount || invoice.total || 0)
    }];

    // Prepare invoice data
    const data = {
      apiKey: "free",
      mode: "development",
      
      // Customize colors based on template
      customize: {
        template: "default"
      },
      
      images: {
        // Add logo here later
        // logo: "base64_logo_string"
      },
      
      sender: {
        company: "QuickInvoice",
        address: "123 Business Street",
        zip: "10001",
        city: "New York",
        country: "USA",
        custom1: "Tax ID: 123-456-7890",
        custom2: "support@quickinvoice.com",
        custom3: "www.quickinvoice.com"
      },
      
      client: {
        company: invoice.client_name,
        address: invoice.client_address || "Client Address",
        zip: "",
        city: "",
        country: "",
        custom1: invoice.client_email || ""
      },
      
      information: {
        number: invoice.invoice_number || `INV-${invoice.id}`,
        date: new Date(invoice.created_at).toLocaleDateString('en-US'),
        dueDate: new Date(invoice.due_date).toLocaleDateString('en-US')
      },
      
      products: products,
      
      discount: invoice.discount || 0,
      tax: invoice.tax_amount || 0,
      
      "bottom-notice": invoice.notes || "Thank you for your business! Payment is due within the specified due date.",
      
      settings: {
        currency: "USD",
        locale: "en-US",
        marginTop: 25,
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 25,
        format: "A4"
      },
      
      // Translate
      translate: {
        invoice: "INVOICE",
        number: "Invoice #",
        date: "Invoice Date",
        dueDate: "Due Date",
        subtotal: "Subtotal",
        products: "Items",
        quantity: "Qty",
        price: "Unit Price",
        "product-total": "Total",
        total: "Total Amount"
      }
    };

    // Generate PDF
    const result = await easyinvoice.createInvoice(data);
    
    // Save PDF to file
    fs.writeFileSync(pdfPath, result.pdf, 'base64');
    
    console.log('✅ PDF generated successfully with template:', template);
    return true;
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
};

module.exports = generateInvoicePDF;