import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
import { json } from '@sveltejs/kit';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {

    const { productIds } = await request.json();
    
    if (!productIds || !Array.isArray(productIds)) {
        return json(
            { error: 'Product IDs array is required' },
            { status: 400 }
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
        
        const database = client.db('callow');
        const collection = database.collection('products');
        
        // Create queries for both ObjectId and normal id formats
        const queries = productIds.map(id => {
            try {
                return { _id: new ObjectId(id) };
            } catch {
                // Clean the ID by removing leading zeros and ensuring string format
                const cleanId = String(parseInt(id));
                return { id: cleanId };
            }
        });

        const products = await collection.find({ $or: queries }).toArray();
        
        // Convert array to object with cleaned product IDs as keys
        const productsMap = products.reduce((acc, product) => {
            // If it's an ObjectId, just use its string representation
            const id = product.id || product._id.toString();
            acc[id] = product;
            return acc;
        }, {});

        return json(
            productsMap,
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
                }
            }
        );
    } catch (error) {
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
