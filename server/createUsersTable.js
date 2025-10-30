const pool = require('./db');

const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Add user_id to invoices table
    await pool.query(`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    `);

    // Add user_id to expenses table
    await pool.query(`
      ALTER TABLE expenses 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    `);

    console.log('✅ Users table created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating users table:', err);
    process.exit(1);
  }
};

createUsersTable();