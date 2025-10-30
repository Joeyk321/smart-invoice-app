import React, { useState } from 'react';

function ExpenseScanner() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a receipt image first!');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('receipt', file);

      const response = await fetch('http://localhost:5000/api/scan-receipt', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.expense);
        alert('Receipt scanned successfully!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error scanning receipt: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📸 AI Receipt Scanner</h2>
      <p>Upload a receipt and let AI extract the details!</p>

      <div style={{ marginTop: '30px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '2px dashed #ccc',
            borderRadius: '5px',
            width: '100%',
            cursor: 'pointer'
          }}
        />

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🤖 Scanning...' : '📸 Scan Receipt'}
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#d4edda',
          borderRadius: '5px',
          border: '1px solid #c3e6cb'
        }}>
          <h3>✅ Expense Saved!</h3>
          <p><strong>Vendor:</strong> {result.vendor || 'N/A'}</p>
          <p><strong>Amount:</strong> ${parseFloat(result.amount).toFixed(2)}</p>
          <p><strong>Category:</strong> {result.category || 'N/A'}</p>
          <p><strong>Date:</strong> {result.date ? new Date(result.date).toLocaleDateString() : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default ExpenseScanner;