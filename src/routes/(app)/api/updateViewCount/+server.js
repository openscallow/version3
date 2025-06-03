import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    let { productId } = await request.json();
    console.log(productId)
    
    // Convert string ID to MongoDB ObjectId
    // const productId = new ObjectId(productId);
    // delete productId._id; // Remove _id from update data

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
        
        const result = await collection.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { viewCount: 1 } }
        );

        if (result.matchedCount === 0) {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        console.log('Product updated successfully');

        return new Response(
            JSON.stringify({ message: "Product updated successfully" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating productId:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while updating the productId' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await client.close();
    }
}