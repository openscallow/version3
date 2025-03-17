import { json } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'gautam',
    host: 'callowpostgresql.cpam6os8m3nn.ap-south-1.rds.amazonaws.com',//fake endpoint for security purpose
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
        const { mobile, profile } = await request.json();

        // Establish database connection
        client = await pool.connect();
        console.log("Connection established successfully");

        // Update query to modify profile in users table based on mobile number
        const query = `
            UPDATE users 
            SET profile = $1 
            WHERE mobile = $2 
            RETURNING *;
        `;

        // Execute the update query
        const result = await client.query(query, [profile, mobile]);

        // Check if any rows were updated
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ 
                error: 'No user found with the provided mobile number' 
            }), { status: 404 });
        }

        console.log("Profile updated successfully");
        
        // Send back successful response
        return new Response(JSON.stringify({
            message: 'Profile updated successfully',
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error updating profile in the database:', error);

        // Handle specific PostgreSQL errors
        if (error.code === '23505') { // unique violation
            return new Response(JSON.stringify({ 
                error: 'A unique constraint violation occurred' 
            }), { status: 409 });
        }
        
        // Generic error response
        return new Response(JSON.stringify({ 
            error: 'Internal server error',
            details: error.message 
        }), { status: 500 });

    } finally {
        // Ensure the client is released back to the pool
        if (client) {
            client.release();
        }
    }
}