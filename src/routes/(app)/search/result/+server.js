import { algoliasearch } from 'algoliasearch';
import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';

dotenv.config();

let appId = env.ALGOLIA_API_ID || process.env.ALGOLIA_API_ID;
let apiKey = env.ALGOLIA_API_KEY || process.env.ALGOLIA_API_KEY;

export async function GET({ url }) {
    const productQuery = url.searchParams.get('query');
    
    const client = algoliasearch(appId, apiKey);
    try {
        const indexName = "products";
        const { results } = await client.search({
            requests: [
                {indexName, query: productQuery}
            ]
        });

        console.log(results)

        return new Response(JSON.stringify(results[0].hits), {
            headers: {
                "content-type": "application/json"
            }
        });
    
    } catch (error) {
        console.error('Error retrieving product:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while retrieving the product' }),
            {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            }
        );
    }
}