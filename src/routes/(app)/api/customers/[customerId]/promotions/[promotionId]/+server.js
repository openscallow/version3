import { error } from '@sveltejs/kit';
import { pool } from '$config/postgresql.config';

export async function PATCH({ params }) {
    const { customerId, promotionId } = params;

    if (!customerId) {
        throw error(400, 'Customer ID is required');
    }

    if (!promotionId) {
        throw error(400, 'Promotion ID is required');
    }

    try {
        const query = `
            UPDATE public.customer_promotion_tasks
            SET status = 'enrolled'
            WHERE
                promotion_id = $1
                AND customer_id = $2
                AND status = 'eligible';
        `;

        const result = await pool.query(query, [
            Number(promotionId),
            customerId
        ]);

        // 🔐 Enforce state-machine correctness
        if (result.rowCount === 0) {
            return new Response(
                JSON.stringify({
                    message: 'Promotion cannot be enrolled (not eligible or not assigned)'
                }),
                {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({
                message: 'Promotion enrolled successfully'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (err) {
        console.error('Error enrolling promotion:', err);

        return new Response(
            JSON.stringify({
                message: 'Failed to enroll promotion'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
