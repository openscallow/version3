import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function GET({ url }) {
    const productId = url.searchParams.get('productid');
    console.log('productId:', productId);
    
    if (!productId) {
        return new Response(
            JSON.stringify({ error: 'Product ID is required' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

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
        
        // Convert string ID to ObjectId if it's in ObjectId format
        let query = {};
        try {
            query = { _id: new ObjectId(productId) };
        } catch {
            // If productId is not in ObjectId format, search by other identifier
            query = { id: productId };
        }

        const product = await collection.findOne(query);
        
        if (!product) {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({ product }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
                }
            }
        );
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
    } finally {
        await client.close();
    }
}