import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function GET({ url }) {
    const route = parseInt(url.searchParams.get('route'));
    console.log('route', route);

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
        const collection = database.collection('schools');
    
        let query = { route: route };

        // Changed from findOne() to find() to get all matching routes
        const routesResult = await collection.find(query).toArray();
        
        if (!routesResult || routesResult.length === 0) {
            return new Response(
                JSON.stringify({ error: 'route not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        return new Response(
            JSON.stringify({ routes: routesResult }),
            {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error retrieving routes:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while retrieving the routes' }),
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