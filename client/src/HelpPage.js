import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Book, Video, Mail, ChevronDown, ChevronRight, FileText, Receipt, CreditCard, Phone, X } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

function HelpPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const helpArticles = {
    "Creating your first invoice": {
      title: "Creating your first invoice",
      content: "To create your first invoice in QuickInvoice: 1. Log into your account and navigate to the dashboard. 2. Click the 'Create Invoice' button at the top of the page. 3. Fill in your client's information including name, email, and address. 4. Add line items for products or services, including descriptions and prices. 5. Set payment terms (net 15, net 30, etc.) and add any notes. 6. Review the invoice summary and click 'Generate Invoice'. 7. Choose to send via email or download as a PDF.",
      category: "Getting Started"
    },
    "Setting up your account": {
      title: "Setting up your account",
      content: "Complete your QuickInvoice account setup: 1. Add your business information in Settings, including company name, address, phone, and email. 2. Upload your company logo for branded invoices. 3. Configure your business address and contact details. 4. Set your preferred currency and tax settings. 5. Add payment information if you want to accept online payments. 6. Customize invoice numbering format. 7. Set up email notifications for when invoices are viewed or paid.",
      category: "Getting Started"
    },
    "Understanding the dashboard": {
      title: "Understanding the dashboard",
      content: "Your QuickInvoice dashboard provides a complete overview of your business finances: Revenue Section shows total income and recent invoice payments. Expenses section displays your spending and expense categories. Charts visualize your income vs expenses over time. Recent Invoices shows your latest transactions with payment status. Quick Actions let you create invoices, scan receipts, or view reports with one click. Statistics include outstanding balances, paid invoices count, and this month's revenue.",
      category: "Getting Started"
    },
    "Invoice templates": {
      title: "Invoice templates",
      content: "Choose from 20+ professional invoice templates: 1. Browse templates in the Template Gallery section. 2. Preview any template to see how it looks. 3. Select a template that matches your brand. 4. Customize colors, fonts, and add your logo. 5. Save your customized template as your default. 6. You can switch templates anytime and maintain multiple versions for different client types or services.",
      category: "Invoicing"
    },
    "Payment terms": {
      title: "Payment terms",
      content: "Set payment terms that work for your business: Common terms include Net 15, Net 30, or Net 60 days. Due Date On Receipt requires immediate payment. Custom terms let you specify any timeframe. Add late payment fees if applicable (e.g., 1.5% monthly interest). Specify accepted payment methods (check, bank transfer, credit card). These terms help set clear expectations with your clients.",
      category: "Invoicing"
    },
    "Sending invoices": {
      title: "Sending invoices",
      content: "Send professional invoices to clients: After creating an invoice, click 'Send Invoice'. The system generates a professional PDF automatically. Enter your client's email address or select from saved contacts. Customize the email message if needed. The client receives an email with the invoice PDF attached. Clients can view, download, and pay directly from the email link. Track when your invoice was sent, viewed, and paid.",
      category: "Invoicing"
    },
    "Tracking payments": {
      title: "Tracking payments",
      content: "Monitor invoice payments efficiently: View all invoices and their status (draft, sent, viewed, paid, overdue). Get email notifications when invoices are opened or paid. See outstanding balances for each client. Filter by payment status, client, or date range. Generate payment reports to see your cash flow. Set up automated payment reminders for overdue invoices.",
      category: "Invoicing"
    },
    "AI receipt scanning": {
      title: "AI receipt scanning",
      content: "Use AI to automatically scan and categorize receipts: Take a photo of your receipt using your smartphone or upload an image. Our AI analyzes the receipt using GPT-4 Vision technology. Automatically extracts vendor name, amount, date, and tax amount. Suggests an appropriate expense category. You can edit any extracted information if needed. Saves time - no manual data entry required. Accuracy rate of 99.9%.",
      category: "Expense Tracking"
    },
    "Manual expense entry": {
      title: "Manual expense entry",
      content: "Add expenses manually if needed: Go to the Expenses section and click 'Add Expense'. Enter the vendor name and date of purchase. Add the expense amount and any applicable tax. Select an expense category (meals, office supplies, travel, etc.). Add a description or notes. Attach a receipt or document if you have it. Save the expense - it will appear in your reports and tax deductions.",
      category: "Expense Tracking"
    },
    "Expense categories": {
      title: "Expense categories",
      content: "Organize expenses with categories: Pre-set categories include Office Supplies, Meals & Entertainment, Travel, Software Subscriptions, Utilities, Marketing, Professional Services. Create custom categories specific to your business. Categorize expenses to make tax reporting easier. View spending breakdown by category in analytics. Export categorized reports for your accountant.",
      category: "Expense Tracking"
    },
    "Tax deductions": {
      title: "Tax deductions",
      content: "Track potential tax deductions: All business expenses are automatically tracked and categorized. View a tax deduction estimate at year-end. Generate comprehensive reports for your accountant. Ensure eligible expenses are properly documented. Export detailed reports showing all deductions. Keep receipts stored securely in the cloud.",
      category: "Expense Tracking"
    },
    "Payment methods": {
      title: "​Payment methods",
      content: "Accept various payment methods: Bank Transfer via ACH, Credit Card processing through Stripe integration, PayPal payments for convenience, Check payments (tracked manually). Set up payment gateways in Settings. Provide multiple options to clients for faster payment. All payments are securely processed with PCI compliance.",
      category: "Billing & Payments"
    }
  };

  const faqItems = [
    {
      id: 1,
      question: "How do I create my first invoice?",
      answer: "To create your first invoice, click the 'Create Invoice' button on your dashboard, fill in the client details, add line items, and click 'Send Invoice'. You can also use our templates for faster setup."
    },
    {
      id: 2,
      question: "How does AI receipt scanning work?",
      answer: "Simply take a photo of your receipt using the mobile app or upload an image. Our AI will automatically extract the vendor name, amount, date, and categorize the expense for you with 99.9% accuracy."
    },
    {
      id: 3,
      question: "Can I customize invoice templates?",
      answer: "Yes! You can customize your invoice templates with your logo, company colors, fonts, and add custom fields. We offer 20+ professional templates to choose from."
    },
    {
      id: 4,
      question: "How do I track payments?",
      answer: "All your invoices are automatically tracked in the dashboard. You can see payment status, send reminders, and get notifications when payments are received."
    },
    {
      id: 5,
      question: "Is my data secure?",
      answer: "Absolutely! We use bank-level 256-bit SSL encryption and are SOC 2 compliant. Your financial data is protected with the highest security standards."
    },
    {
      id: 6,
      question: "Can I integrate with accounting software?",
      answer: "Yes! We integrate with QuickBooks, Xero, FreshBooks, and other popular accounting software. You can also export data in various formats."
    }
  ];

  const helpCategories = [
    {
      title: "Getting Started",
      icon: <Book size={24} />,
      description: "Learn the basics of QuickInvoice",
      articles: ["Creating your first invoice", "Setting up your account", "Understanding the dashboard"]
    },
    {
      title: "Invoicing",
      icon: <FileText size={24} />,
      description: "Everything about creating and managing invoices",
      articles: ["Invoice templates", "Payment terms", "Sending invoices", "Tracking payments"]
    },
    {
      title: "Expense Tracking",
      icon: <Receipt size={24} />,
      description: "Manage and track your business expenses",
      articles: ["AI receipt scanning", "Manual expense entry", "Expense categories", "Tax deductions"]
    },
    {
      title: "Billing & Payments",
      icon: <CreditCard size={24} />,
      description: "Payment processing and billing questions",
      articles: ["Payment methods", "Payment processing", "Billing cycles", "Refunds"]
    },
    {
      title: "Account & Settings",
      icon: <HelpCircle size={24} />,
      description: "Account management and preferences",
      articles: ["Profile settings", "Notification preferences", "Security settings", "Account limits"]
    },
    {
      title: "Troubleshooting",
      icon: <Phone size={24} />,
      description: "Common issues and solutions",
      articles: ["Login problems", "Sync issues", "Email delivery", "Mobile app issues"]
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleArticleClick = (articleName) => {
    if (helpArticles[articleName]) {
      setSelectedArticle(articleName);
    }
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="page-container">
      <Navigation
        onNavigateToLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
        onNavigateToPage={onNavigateToPage}
      />
      <div className="page-content">
        <div className="page-hero">
          <h1>Help Center</h1>
          <p className="page-subtitle">
            Find answers to your questions and learn how to get the most out of QuickInvoice.
          </p>
        </div>

        {/* Search Bar */}
        <section className="search-section">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Help Categories */}
        <section className="help-categories-section">
          <h2>Browse by Category</h2>
          <div className="categories-grid">
            {helpCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="articles-list">
                  {category.articles.map((article, articleIndex) => (
                    <div 
                      key={articleIndex} 
                      className="article-item"
                      onClick={() => handleArticleClick(article)}
                      style={{ cursor: 'pointer' }}
                    >
                      <ChevronRight size={16} />
                      <span>{article}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <div key={item.id} className="faq-item">
                <div 
                  className="faq-question"
                  onClick={() => toggleFAQ(item.id)}
                >
                  <h3>{item.question}</h3>
                  <div className={`faq-icon ${expandedFAQ === item.id ? 'expanded' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
                {expandedFAQ === item.id && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Support */}
        <section className="contact-support-section">
          <h2>Still Need Help?</h2>
          <p>Can't find what you're looking for? Our support team is here to help.</p>
          <div className="support-options">
            <div className="support-option">
              <MessageCircle size={24} />
              <h3>Live Chat</h3>
              <p>Get instant help from our support team</p>
              <button className="support-btn">Start Chat</button>
            </div>
            <div className="support-option">
              <Mail size={24} />
              <h3>Email Support</h3>
              <p>Send us a detailed message</p>
              <button className="support-btn">Send Email</button>
            </div>
            <div className="support-option">
              <Phone size={24} />
              <h3>Phone Support</h3>
              <p>Speak directly with our team</p>
              <button className="support-btn">Call Now</button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Help Article Modal */}
      {selectedArticle && helpArticles[selectedArticle] && (
        <div className="help-modal-overlay" onClick={closeModal}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="help-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            <div className="help-modal-content">
              <h2>{helpArticles[selectedArticle].title}</h2>
              <p>{helpArticles[selectedArticle].content}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer onNavigateToPage={onNavigateToPage} />
    </div>
  );
}

export default HelpPage;