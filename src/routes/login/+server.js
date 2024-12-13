import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        const { mobile, password } = await request.json();

        // Validate input
        if (!mobile || !/^\d{10}$/.test(mobile)) {
            console.error('Validation Error: Invalid or missing mobile number.');
            return new Response(
                JSON.stringify({ message: 'Invalid mobile number. Please provide a valid 10-digit mobile number.' }),
                { status: 400 }
            );
        }

        if (!password || password.trim() === '') {
            console.error('Validation Error: Password is missing or empty.');
            return new Response(
                JSON.stringify({ message: 'Password cannot be empty. Please provide a valid password.' }),
                { status: 400 }
            );
        }

        console.log('Checking user credentials for mobile:', mobile);

        // Check if the customer exists in the database
        const checkQuery = 'SELECT * FROM customers WHERE customer_mobile = $1 AND customer_password = $2';
        const checkResult = await pool.query(checkQuery, [mobile, password]);

        if (checkResult.rows.length > 0) {
            console.log('User authenticated successfully:', checkResult.rows[0].customer_id);
            return new Response(
                JSON.stringify({ Customer: checkResult.rows[0], message: 'Login successful.' }),
                { status: 200 }
            );
        } else {
            console.warn('Authentication failed: No matching user found.');
            return new Response(
                JSON.stringify({ message: 'User not found. Please check your credentials and try again.' }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error during user authentication:', error.message);
        return new Response(
            JSON.stringify({ message: 'An internal server error occurred. Please try again later.', error: error.message }),
            { status: 500 }
        );
    }
}
