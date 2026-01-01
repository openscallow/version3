/**
 * Created by: Gautam mer (CEO)
 * Created at: 31/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 31/12/2025
 * Last change: Initialize
 * 
*/
import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

const URI = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export const mongodbClient = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});