import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function GET() {
    console.log('inside flash Deals');
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        const database = client.db('callow');
        const collection = database.collection('products');
        console.log('Connected to collection');

        // Modified query to sort by purchaseCount in descending order
        const query = {
            $expr: {
                $gt: [
                    { $subtract: ["$mrp", "$currentPrice"] },
                    { $multiply: ["$mrp", 0.3] } // 30% or more discount
                ]
            }
        };

        const trendingProducts = await collection.find(query).toArray();

        console.log('Retrieved trending products:', trendingProducts);
        return new Response(
            JSON.stringify({ products: trendingProducts }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
                },
            }
        );
    } catch (error) {
        console.error('Error retrieving trending products:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while retrieving trending products.' }),
            {
                status: 500,
                headers: { 
                    'Content-Type': 'application/json',
                },
            }
        );
    } finally {
        await client.close();
    }
}