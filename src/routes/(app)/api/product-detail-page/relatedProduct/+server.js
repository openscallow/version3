/**
 * Created by: Gautam mer (CEO)
 * Created at: 28/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 28/12/2025
 * Last change: initialize
 * 
*/
import { env } from '$env/dynamic/private'; 
import dotenv from 'dotenv';

dotenv.config();

const ALGOLIA_API_ID = env.ALGOLIA_API_ID || process.env.ALGOLIA_API_ID;
const ALGOLIA_API_KEY = env.ALGOLIA_API_KEY || process.env.ALGOLIA_API_KEY;

export async function POST({ request }) {
    const {objectID} = await request.json()

    try {
        const response = await fetch(`https://${ALGOLIA_API_ID}-dsn.algolia.net/1/indexes/*/recommendations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Algolia-Application-Id': ALGOLIA_API_ID,
                'X-Algolia-API-Key': ALGOLIA_API_KEY
            },
            body: JSON.stringify({
                requests: [{
                    objectID,
                    threshold: 0,
                    indexName: 'products',
                    maxRecommendations: 7,
                    model: 'related-products',  
                }]
            })
        })

        if (response.ok) {
            
            const { results } = await response.json();
    
            const curatedResult = results?.[0]?.hits.map(({_id, images,productName,viewCount,mrp,currentPrice}) => ({
                id: _id,
                image: images?.[0],
                name: productName,
                view: viewCount,
                mrp,
                currentPrice,
                discount: mrp ? Math.round(((mrp - currentPrice) / mrp) * 100) : 0
            }))   
            
            return new Response(JSON.stringify(curatedResult), {
                headers: {"content-type": "application/json"}
            });
        }
    } catch (error) {
        throw new Error("Something went wrong in retriving relative product")
    }
}