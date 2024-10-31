// Import the pg pool from your db configuration
import { pool } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { name, mobile } = await request.json();
  
  try {
    // Using $1, $2 for PostgreSQL parameterized queries
    const query = 'INSERT INTO "user" (name, mobile) VALUES ($1, $2) RETURNING id';
    const result = await pool.query(query, [name, mobile]);
    
    // PostgreSQL returns the inserted record in rows[0]
    return new Response(
      JSON.stringify({ id: result.rows[0].id }), 
      { status: 201 }
    );

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