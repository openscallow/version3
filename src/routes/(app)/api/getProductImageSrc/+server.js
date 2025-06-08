import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
import { json } from '@sveltejs/kit';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {

    const { productId } = await request.json();

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
    
        const { images } = await collection.findOne(
            { _id: new ObjectId(productId)},
            { projection: { images: 1, _id: 0 } }
        );
        return new Response(JSON.stringify({src: images[0]}),{
            status: 200,
            headers: {"Content-type": "application/json"}
        })
    } catch (error) {
        console.error('Server error:', error);
    } finally {
        await client.close();
    }
}
