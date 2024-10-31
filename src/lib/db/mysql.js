import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',        // e.g., 'database-1.cluster-xxxxxx.us-east-1.rds.amazonaws.com'
  user: 'gautam',    // e.g., 'admin'
  password: 'Gautam404&',
  database: 'callowdb' // e.g., 'mydatabase'
});

// export async function query(sql, params) {
//   const [results] = await pool.execute(sql, params);
//   return results;
// }


async function testConnection() {
  try {
    const res = await pool.query('SELECT * FROM user');
    console.log('Query Result:', res.rows);
  } catch (error) {
    console.error('Database Connection Error:', error); // Log any errors
  } finally {
    pool.end(); // Ensure the pool is closed
  }
}

testConnection();