import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { env } from '$env/dynamic/private';
import logtail from '$config/logtail.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    let productVisitInfo = await request.json();
    console.log(productVisitInfo)

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
        const collection = database.collection('productVisitInfo');
        
        const result = await collection.insertOne(productVisitInfo);

        if (result.matchedCount === 0) {
            return new Response(
                JSON.stringify({ error: 'Product not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Product updated successfully" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        logtail.error(error, {
            file: path.basename(__filename),
            directory: __dirname,
            productVisitInfo,
        })
        logtail.flush()
        
        console.error('Error updating product:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while updating the product' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await client.close();
    }
}