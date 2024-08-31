import mysql from 'mysql2/promise';

export async function POST({ request }) {
  let connection;
  const { name, mobile } = await request.json();

  try {
    connection = await mysql.createConnection({
      host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',
        user: 'gautam',
        password: 'Gautam404&',
        database: 'callowdb'
    });

    const query = 'INSERT INTO user (name, mobile) VALUES (?, ?)';
    const [result] = await connection.execute(query, [name, mobile]);

    return new Response(JSON.stringify({ id: result.insertId }), { status: 201 });
  } catch (error) {
    console.error('Error inserting into the database:', error);
    return new Response(JSON.stringify({ error: 'Database insertion failed' }), { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
