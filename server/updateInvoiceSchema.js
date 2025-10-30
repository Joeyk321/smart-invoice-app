const pool = require('./db');

const updateSchema = async () => {
  try {
    // Create invoice_items table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS invoice_items (
        id SERIAL PRIMARY KEY,
        invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
        description VARCHAR(500) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add new columns to invoices table if they don't exist
    await pool.query(`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5, 2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10, 2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS discount DECIMAL(10, 2) DEFAULT 0,
      ADD COLUMN IF NOT EXISTS total DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS invoice_number VARCHAR(50),
      ADD COLUMN IF NOT EXISTS payment_terms VARCHAR(100) DEFAULT 'Due on Receipt',
      ADD COLUMN IF NOT EXISTS notes TEXT
    `);

    console.log('✅ Invoice schema updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating schema:', err);
    process.exit(1);
  }
};

updateSchema();