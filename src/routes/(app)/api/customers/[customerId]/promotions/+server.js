import { error } from '@sveltejs/kit';
import { pool } from '$config/postgresql.config';

export async function GET({ url, params }){
    const { customerId } = params;
    const status = url.searchParams.get('status')

    if (!customerId) throw error(400, { message: 'Customer ID is required' });

    try {
        const query = `SELECT 
                        pc.id AS promotion_id,
                        pc.code,
                        pc.descriptions,
                        pc.discount_type,
                        pc.discount_value,
                        pc.max_discount_cap,

                        cpt.enrolled_at,
                        cpt.deadline_at,
                        cpt.progress_count,
	                    cpt.qualified_at
                    FROM promotion_campaigns pc 
                    JOIN customer_promotion_tasks cpt ON cpt.promotion_id = pc.id
                    WHERE 
	                    pc.is_active = TRUE
	                    AND cpt.customer_id = $1
	                    AND COALESCE(cpt.status, 'eligible') = $2
	                    AND (NOW() AT TIME ZONE 'Asia/Kolkata') BETWEEN pc.starts_at AND pc.expires_at;`;

    let result = await pool.query(query, [customerId, status]);
    console.log(result, 'server')
    
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
}