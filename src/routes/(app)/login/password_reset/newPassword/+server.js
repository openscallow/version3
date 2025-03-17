import { pool } from '$lib/db/config.js';

export async function POST({ request }) {
    try {
        const { mobile, newPassword } = await request.json();

        // Check if the customer exists
        const checkQuery = 'SELECT * FROM customers WHERE customer_mobile = $1';
        const checkResult = await pool.query(checkQuery, [mobile]);

        if (checkResult.rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Customer not found' }), { status: 404 });
        }

        // Update the customer's password
        const updateQuery = 'UPDATE customers SET customer_password = $1 WHERE customer_mobile = $2 RETURNING *';
        const updateResult = await pool.query(updateQuery, [newPassword, mobile]);

        if (updateResult.rows.length > 0) {
            // Send the updated customer details in the response
            return new Response(JSON.stringify({
                message: 'Customer password updated successfully',
                updatedCustomer: updateResult.rows[0]
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to update customer password' }), { status: 500 });
        }
    } catch (error) {
        console.error('Error updating customer password:', error);
        return new Response(JSON.stringify({ message: 'Internal server error', error }), { status: 500 });
    }
}
