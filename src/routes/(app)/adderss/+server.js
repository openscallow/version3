import { algoliasearch } from 'algoliasearch';
import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';

dotenv.config()

let appId = env.ALGOLIA_API_ID || process.env.ALGOLIA_API_ID
let apiKey = env.ALGOLIA_API_KEY || process.env.ALGOLIA_API_KEY
export async function POST({request}) {
    const client = algoliasearch(appId, apiKey);
    try {
        let { searchQuery }= await request.json();
        const indexName = "list";
        const { results } = await client.search({
            requests: [
                {indexName,query: searchQuery,}
            ]
        });

        return new Response(JSON.stringify(results[0].hits), {
            headers: {
                "content-type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }    
}

