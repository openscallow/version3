import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { mobile } = await request.json();

  const connection = await mysql.createConnection({
    host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',
	user: 'gautam',
	password: 'Gautam404&',
	database: 'callowdb'
  });

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM `order` WHERE mobile = ? AND status IN (?, ?)',
      [mobile, 'pending', 'complete']
    );

    return json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    return json({ error: 'Failed to retrieve orders' }, { status: 500 });
  } finally {
    await connection.end();
  }
}