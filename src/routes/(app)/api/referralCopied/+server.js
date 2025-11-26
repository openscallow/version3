/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 26/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 26/11/2025
 * Last change: initilize
 * 
*/

import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    let { customer_id } = await request.json();

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
        const collection = database.collection('customers');

        const result = await collection.updateOne(
            { _id: customer_id },
            {
                $set: {
                    "referralAnalytics.lastCopyTimestamp": new Date()
                }
            }
        );

        console.log(result)

        return new Response(
            JSON.stringify({ unnecessaryMessage: "customer visit update successfully" }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating productId:', error);
        return new Response(
            JSON.stringify({ error: 'An error occurred while updating the customer visit' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    } finally {
        await client.close();
    }
}