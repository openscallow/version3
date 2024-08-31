import mysql from 'mysql2/promise';

export async function POST({ request }) {
  let connection;
  const { name, mobile, address, product, indexs } = await request.json(); // Ensure this matches client-side code
  const Status = "pending";
  
  console.log('Received data:', { name, mobile, address, product, indexs });

  try {
    connection = await mysql.createConnection({
      host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com', // fake end point to secure from you
      user: 'gautam',
      password: 'Gautam404&',
      database: 'callowdb'
    });
    console.log('Database connection established');

    const query = 'INSERT INTO `order` (name, mobile, address, product, status, productx) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await connection.execute(query, [name, mobile, address, product, Status, indexs]); 
    console.log('Query executed successfully:', query);

    return new Response(JSON.stringify({ id: result.insertId }), { status: 201 });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    return new Response(JSON.stringify({ error: 'Database insertion failed', details: error.message }), { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}
