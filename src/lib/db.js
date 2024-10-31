import pkg from 'pg';
const { Pool } = pkg;

// Configure your database connection.
const pool = new Pool({
  user: 'gautam',
  host: 'callowpostgresql.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'Gautam404&',
  port: 5432, 
  ssl: {
    rejectUnauthorized: false  // Add this - sometimes needed for RDS
  } 
});

export async function query(text, params) {
  return pool.query(text, params);
}

// async function testConnection() {
//   try {
//     const res = await pool.query('SELECT * FROM orders');
//     console.log('Query Result:', res.rows['mobile']);
//   } catch (error) {
//     console.error('Database Connection Error:', error); // Log any errors
//   } finally {
//     pool.end(); // Ensure the pool is closed
//   }
// }

// testConnection();
