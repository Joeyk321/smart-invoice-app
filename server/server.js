const express = require('express');
const cors = require('cors');
const pool = require('./db');
const generateInvoicePDF = require('./generatePDF');
const sendInvoiceEmail = require('./sendEmail');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// JWT Secret Key - CHANGE THIS IN PRODUCTION!
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production-12345';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Set up file upload
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Serve uploaded receipt images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// =====================
// AUTHENTICATION ROUTES
// =====================

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name, companyName } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, password, name, company_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, name, company_name, created_at`,
      [email, hashedPassword, name, companyName || null]
    );

    const user = result.rows[0];

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    console.log('✅ User registered:', email);
    res.json({ 
      message: 'User registered successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.company_name
      }
    });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    console.log('✅ User logged in:', email);
    res.json({ 
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.company_name
      }
    });
  } catch (err) {
    console.error('❌ Error logging in:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // { userId: 1, email: 'user@example.com' }
    next();
  });
};

// Get current user
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, company_name, created_at FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ===============
// INVOICE ROUTES
// ===============

// Create invoice route
app.post('/api/invoices', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { 
      clientName, 
      clientEmail, 
      clientAddress,
      dueDate, 
      paymentTerms,
      taxRate,
      discount,
      notes,
      items,
      subtotal,
      taxAmount,
      total
    } = req.body;
    
    // Generate invoice number
    const invoiceNumber = 'INV-' + Date.now();
    
    // Insert invoice
    const invoiceResult = await client.query(
      `INSERT INTO invoices (
        client_name, 
        client_email, 
        client_address,
        due_date, 
        payment_terms,
        tax_rate,
        discount,
        notes,
        subtotal,
        tax_amount,
        total,
        invoice_number,
        status
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [
        clientName, 
        clientEmail, 
        clientAddress,
        dueDate, 
        paymentTerms,
        taxRate,
        discount,
        notes,
        subtotal,
        taxAmount,
        total,
        invoiceNumber,
        'unpaid'
      ]
    );
    
    const invoice = invoiceResult.rows[0];
    
    // Insert invoice items
    for (const item of items) {
      await client.query(
        `INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, amount)
         VALUES ($1, $2, $3, $4, $5)`,
        [invoice.id, item.description, item.quantity, item.unitPrice, item.amount]
      );
    }
    
    await client.query('COMMIT');
    
    console.log('✅ Invoice saved to database!');
    res.json({ 
      message: 'Invoice created successfully!',
      invoice: invoice
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating invoice:', err);
    res.status(500).json({ error: 'Failed to create invoice' });
  } finally {
    client.release();
  }
});

// Get all invoices route
app.get('/api/invoices', async (req, res) => {
  try {
    // Get all invoices
    const invoicesResult = await pool.query(
      'SELECT * FROM invoices ORDER BY created_at DESC'
    );
    
    // Get items for each invoice
    const invoices = await Promise.all(
      invoicesResult.rows.map(async (invoice) => {
        const itemsResult = await pool.query(
          'SELECT * FROM invoice_items WHERE invoice_id = $1',
          [invoice.id]
        );
        return {
          ...invoice,
          items: itemsResult.rows
        };
      })
    );
    
    res.json(invoices);
  } catch (err) {
    console.error('❌ Error fetching invoices:', err);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Send invoice via email
app.post('/api/invoices/:id/send', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get invoice from database
    const invoiceResult = await pool.query('SELECT * FROM invoices WHERE id = $1', [id]);
    
    if (invoiceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    const invoice = invoiceResult.rows[0];
    
    // Get invoice items
    const itemsResult = await pool.query(
      'SELECT * FROM invoice_items WHERE invoice_id = $1',
      [id]
    );
    invoice.items = itemsResult.rows;
    
    // Create invoices directory if it doesn't exist
    const invoicesDir = path.join(__dirname, 'invoices');
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir);
    }
    
    // Generate PDF
    const pdfPath = path.join(invoicesDir, `invoice-${id}.pdf`);
    await generateInvoicePDF(invoice, pdfPath);
    
    console.log('✅ PDF generated:', pdfPath);
    
    // Send email
    const emailResult = await sendInvoiceEmail(invoice.client_email, pdfPath, invoice);
    
    if (emailResult.success) {
      res.json({ 
        message: 'Invoice sent successfully!',
        previewUrl: emailResult.previewUrl
      });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('❌ Error sending invoice:', error);
    res.status(500).json({ error: 'Failed to send invoice' });
  }
});

// ===============
// EXPENSE ROUTES
// ===============

// AI Receipt Scanner
app.post('/api/scan-receipt', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('📸 Receipt uploaded:', req.file.filename);

    // Read the image file
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract the following from this receipt: vendor/store name, total amount (just the number), date (in YYYY-MM-DD format), and suggest a category (like 'food', 'gas', 'office supplies', 'equipment', etc.). Return ONLY a JSON object with keys: vendor, amount, date, category. If you can't find something, use null."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 300
    });

    const aiResponse = response.choices[0].message.content;
    console.log('🤖 AI Response:', aiResponse);

    // Parse the JSON response
    let cleanResponse = aiResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/<!DOCTYPE.*?>/gi, '')
      .replace(/<html.*?>/gi, '')
      .trim();

    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    console.log('🧹 Cleaned response:', cleanResponse);

    let expenseData;
    try {
      expenseData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      throw new Error('AI returned invalid JSON format');
    }

    // Normalize file path
    const normalizedPath = req.file.path.replace(/\\/g, '/');

    // Save to database
    const result = await pool.query(
      `INSERT INTO expenses (vendor, amount, category, date, receipt_url) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        expenseData.vendor,
        expenseData.amount,
        expenseData.category,
        expenseData.date,
        normalizedPath
      ]
    );

    console.log('✅ Expense saved to database!');

    res.json({
      message: 'Receipt scanned successfully!',
      expense: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Error scanning receipt:', error);
    res.status(500).json({ error: 'Failed to scan receipt: ' + error.message });
  }
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error fetching expenses:', err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🗑️ Attempting to delete expense:', id);
    
    // Get the expense to delete the receipt file
    const expense = await pool.query('SELECT receipt_url FROM expenses WHERE id = $1', [id]);
    
    if (expense.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    if (expense.rows[0].receipt_url) {
      const receiptPath = expense.rows[0].receipt_url;
      
      // Delete the receipt file if it exists
      if (fs.existsSync(receiptPath)) {
        fs.unlinkSync(receiptPath);
        console.log('🗑️ Receipt file deleted:', receiptPath);
      }
    }
    
    // Delete from database
    await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
    
    console.log('✅ Expense deleted from database!');
    res.json({ message: 'Expense deleted successfully!' });
  } catch (err) {
    console.error('❌ Error deleting expense:', err);
    res.status(500).json({ error: 'Failed to delete expense: ' + err.message });
  }
});

// Update expense
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { vendor, amount, category, date } = req.body;
    
    const result = await pool.query(
      `UPDATE expenses 
       SET vendor = $1, amount = $2, category = $3, date = $4
       WHERE id = $5
       RETURNING *`,
      [vendor, amount, category, date, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    console.log('✅ Expense updated!');
    res.json({ 
      message: 'Expense updated successfully!',
      expense: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error updating expense:', err);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 JWT authentication enabled`);
});