import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

const dbName = "callow";
const collectionName = "products";

export async function POST({request}) {
    // Product data to insert
    const productData = await request.json();
    console.log(productData);
    
    const client = new MongoClient(uri, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });
    
    try {
        await client.connect();
    
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
    
        const result = await collection.insertOne(productData);
        console.log(`Data inserted with ID: ${result.insertedId}`);

        return new Response(JSON.stringify({ data: "Product inserted successfully!" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await client.close();
    }
}

