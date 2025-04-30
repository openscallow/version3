import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    let logingInfo = await request.json();
    console.log(logingInfo)

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
        const collection = database.collection('productSearchLog');
        
        const result = await collection.insertOne(logingInfo);

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
        console.error('Error updating product:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while updating the product' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await client.close();
    }
}