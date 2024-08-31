import mysql from 'mysql2/promise';
import { json } from '@sveltejs/kit';

export async function GET() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'callowdatabase.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',
            user: 'gautam',
            password: 'Gautam404&',
            database: 'callowdb'
        });
        
        const query = 'SELECT * FROM `order`';
        const [rows] = await connection.execute(query);
        
        return json(rows);
    } catch (error) {
        console.error('Error retrieving data from the database:', error);
        return json({ error: 'Database retrieval failed' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}