import React, { useState, useEffect } from 'react';
import { Plus, Search, Mail, Phone, MapPin, Calendar, DollarSign, FileText, Edit, Trash2, Eye, Send } from 'lucide-react';

function ClientsPage({ onBackToHome, onNavigateToPage, onNavigateToLogin, onNavigateToSignup }) {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    notes: ''
  });

  // Load clients from localStorage
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients') || '[]');
    setClients(savedClients);
  }, []);

  // Save clients to localStorage
  const saveClients = (updatedClients) => {
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setClients(updatedClients);
  };

  // Add new client
  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) {
      alert('Please fill in at least name and email');
      return;
    }

    const client = {
      id: Date.now().toString(),
      ...newClient,
      createdAt: new Date().toISOString(),
      invoices: [],
      estimates: [],
      totalInvoiced: 0,
      totalPaid: 0
    };

    const updatedClients = [...clients, client];
    saveClients(updatedClients);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      notes: ''
    });
    setShowAddClient(false);
  };

  // Edit client
  const handleEditClient = (client) => {
    setEditingClient(client);
    setNewClient(client);
    setShowAddClient(true);
  };

  // Update client
  const handleUpdateClient = () => {
    const updatedClients = clients.map(client => 
      client.id === editingClient.id 
        ? { ...client, ...newClient }
        : client
    );
    saveClients(updatedClients);
    setShowAddClient(false);
    setEditingClient(null);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      notes: ''
    });
  };

  // Delete client
  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      const updatedClients = clients.filter(client => client.id !== clientId);
      saveClients(updatedClients);
    }
  };

  // Send invoice to client
  const handleSendInvoice = (client) => {
    // Store client data for pre-filling invoice form
    localStorage.setItem('selectedClient', JSON.stringify(client));
    // Navigate to invoice creation with client pre-filled
    onNavigateToPage('create');
  };

  // Send estimate to client
  const handleSendEstimate = (client) => {
    // Navigate to estimate creation with client pre-filled
    onNavigateToPage('estimates');
  };

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Client Management</h1>
            <p>Manage your clients, track invoices, and maintain relationships</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Header Section */}
          <div className="clients-header">
            <div className="header-left">
              <h2>All Clients</h2>
              <p>{clients.length} total clients</p>
            </div>
            <div className="header-right">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                className="btn-primary"
                onClick={() => setShowAddClient(true)}
              >
                <Plus size={20} />
                Add Client
              </button>
            </div>
          </div>

          {/* Add/Edit Client Modal */}
          {showAddClient && (
            <div className="modal-overlay" onClick={() => {
              setShowAddClient(false);
              setEditingClient(null);
              setNewClient({
                name: '',
                email: '',
                phone: '',
                company: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                country: 'United States',
                notes: ''
              });
            }}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>{editingClient ? 'Edit Client' : 'Add New Client'}</h3>
                  <button 
                    className="modal-close"
                    onClick={() => {
                      setShowAddClient(false);
                      setEditingClient(null);
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Client Name *</label>
                      <input
                        type="text"
                        value={newClient.name}
                        onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={newClient.email}
                        onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        value={newClient.phone}
                        onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        value={newClient.company}
                        onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={newClient.address}
                      onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        value={newClient.city}
                        onChange={(e) => setNewClient({...newClient, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        value={newClient.state}
                        onChange={(e) => setNewClient({...newClient, state: e.target.value})}
                        placeholder="NY"
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        value={newClient.zip}
                        onChange={(e) => setNewClient({...newClient, zip: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Notes</label>
                    <textarea
                      value={newClient.notes}
                      onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                      placeholder="Additional notes about this client..."
                      rows="3"
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setShowAddClient(false);
                      setEditingClient(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={editingClient ? handleUpdateClient : handleAddClient}
                  >
                    {editingClient ? 'Update Client' : 'Add Client'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clients Grid */}
          <div className="clients-grid">
            {filteredClients.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={48} />
                </div>
                <h3>No clients found</h3>
                <p>{searchQuery ? 'Try adjusting your search terms' : 'Add your first client to get started'}</p>
                {!searchQuery && (
                  <button 
                    className="btn-primary"
                    onClick={() => setShowAddClient(true)}
                  >
                    <Plus size={20} />
                    Add First Client
                  </button>
                )}
              </div>
            ) : (
              filteredClients.map(client => (
                <div key={client.id} className="client-card">
                  <div className="client-header">
                    <div className="client-avatar">
                      <span>{client.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="client-info">
                      <h3>{client.name}</h3>
                      <p>{client.company || 'Individual Client'}</p>
                    </div>
                    <div className="client-actions">
                      <button 
                        className="action-btn"
                        onClick={() => handleEditClient(client)}
                        title="Edit Client"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDeleteClient(client.id)}
                        title="Delete Client"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="client-details">
                    <div className="detail-item">
                      <Mail size={16} />
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="detail-item">
                        <Phone size={16} />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.address && (
                      <div className="detail-item">
                        <MapPin size={16} />
                        <span>{client.address}, {client.city}, {client.state} {client.zip}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="client-stats">
                    <div className="stat-item">
                      <DollarSign size={16} />
                      <div>
                        <span className="stat-label">Total Invoiced</span>
                        <span className="stat-value">${client.totalInvoiced || 0}</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <FileText size={16} />
                      <div>
                        <span className="stat-label">Invoices</span>
                        <span className="stat-value">{client.invoices?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="client-actions-bottom">
                    <button 
                      className="btn-secondary"
                      onClick={() => handleSendEstimate(client)}
                    >
                      <FileText size={16} />
                      Send Estimate
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => handleSendInvoice(client)}
                    >
                      <Send size={16} />
                      Send Invoice
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsPage;
