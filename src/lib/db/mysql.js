import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',        // e.g., 'database-1.cluster-xxxxxx.us-east-1.rds.amazonaws.com'
  user: 'gautam',    // e.g., 'admin'
  password: 'Gautam404&',
  database: 'callowdb' // e.g., 'mydatabase'
});

export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}