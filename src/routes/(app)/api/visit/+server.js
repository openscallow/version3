/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 21/09/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 21/09/2025
 * 
*/

import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
    let { customer_id, formattedDate } = await request.json();
    console.log(customer_id)

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
        const collection = database.collection('customers');

        const result = await collection.updateOne(
            { _id: customer_id },
            {
                $inc: {
                    "visit_analytics.total_visits": 1,
                    [`daily_visits.daily_visits.${formattedDate}`]: 1
                },
                
                $set: {
                    "visit_analytics.last_visit": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                }
            },
            { upsert: true }
        );

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