import { json } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'gautam',
    host: 'callowpostgresql.cpam6os8m3nn.ap-south-1.rds.amazonaws.com', //fake endpoint for security purpose
    database: 'postgres',
    password: 'Gautam404&',
    port: 5432,
    ssl: {
        rejectUnauthorized: false 
      } 
    }
)

export async function POST({ request }) {

    let client;
    try {
        const { name, mobile, address, product, index } = await request.json();
        const Status = "pending";

        //check connection is estanlished
        client = await pool.connect();
        console.log("connection connected succesfuly");

        // initalize inserting process 
        const query = `INSERT INTO orders (name,mobile, address, product, status, index) 
        VALUES ($1, $2, $3, $4, $5, $6);`;

        await client.query(query, [name, mobile, address, product, Status, index]);
        console.log("inserted data successfully ")
        
        //send back response
        return new Response(null, {
            status: 201
        });

  } catch (error) {
    console.error('Error inserting into the database:', error);

    // Handle specific PostgreSQL errors
    if (error.code === '23505') { // unique violation
      errorResponse.error = 'A record with this information already exists';
      return new Response(JSON.stringify(errorResponse), { status: 409 });
    }
    
    return new Response(JSON.stringify(errorResponse), { status: 500 });
  }
}