import { json } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'gautam',
    host: 'callowpostgresql.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',
    database: 'postgres',
    password: 'Gautam404&',
    port: 5432,
    ssl: {
        rejectUnauthorized: false 
      } 
  });


  export const POST = async ({ request }) => {
    let client;
    try {
      const data = await request.json();
      client = await pool.connect();
      
      const query = `
        INSERT INTO orders (
          name,
          mobile,
          address,
          product,
          status,
          index
        ) 
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      
      const values = [
        data.name,
        data.mobile,
        data.address,
        data.product,
        data.status,
        data.index
      ];
  
      await client.query(query, values);
      console.log("ok")
  
      return json({ 
        message: 'Order created successfully'
      });
    } catch (error) {
      console.error('Database Error:', error);
      return json(
        { error: 'Unable to create order', details: JSON.stringify(error) }, 
        { status: 500 }
      );
    } finally {
      if (client) {
        client.release();
      }
    }
  };