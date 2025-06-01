import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
import { json } from '@sveltejs/kit';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    const { productIds } = await request.json();

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        console.log('connected to mongoDB')
        
        const database = client.db('callow');
        const collection = database.collection('products');
        
        const products = await collection.find(
            { _id: { $in: productIds.map(id => new ObjectId(id)) } },
            {
                projection: {
                    _id: 1,
                    images: 1,
                    productName: 1,
                    mrp: 1,
                    currentPrice: 1,
                    coin_rewards: 1
                }
            }
        ).toArray();

        return new Response(JSON.stringify(products), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        // use telemetry service
        console.error('❌ Server error:', error);
        return json(
            { error: 'An error occurred while retrieving the products' },
            { 
                status: 500,
                headers: { 'Cache-Control': 'no-cache' }
            }
        );
    } finally {
        await client.close();
    }
}