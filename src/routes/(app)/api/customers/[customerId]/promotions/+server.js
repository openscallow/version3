import { error } from '@sveltejs/kit';
import { pool } from '$config/postgresql.config';

export async function GET({ url, params }){
    const { customerId } = params;
    const status = url.searchParams.get('status')

    if (!customerId) throw error(400, { message: 'Customer ID is required' });

    try {
        const query = `
                    SELECT
                        pc.id AS promotion_id,
                        pc.code,
                        pc.descriptions,
                        pc.discount_type,
                        pc.discount_value,
                        pc.max_discount_cap,
                        
                        COALESCE(upt.status, 'eligible') AS status,
                        upt.enrolled_at,
                        upt.deadline_at,
                        upt.progress_count
                    FROM public.promotion_campaigns pc
                    LEFT JOIN public.customer_promotion_tasks upt
                        ON upt.promotion_id = pc.id
                       AND upt.customer_id = $1
                    WHERE
                        upt.customer_id = $1
                        pc.is_active = TRUE
                        AND NOW() BETWEEN pc.starts_at AND pc.expires_at
                        AND COALESCE(upt.status, 'eligible') = $2;`;

    let result = await pool.query(query, [customerId, status]);
    
    return new Response(JSON.stringify(result.rows), {
        status: 200
    })
        
    } catch (error) {
        console.error("Error fetching promotions items:", error);

        return new Response(JSON.stringify({ message: "Failed to fetch promotions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify({ message: "Failed to fetch promotions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    
    
    
}