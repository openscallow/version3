import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST({ request }) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Parse the request body
    const { schoolName } = await request.json();

    if (!schoolName) {
      return new Response(
        JSON.stringify({ error: 'Missing schoolName in the request body.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await client.connect();

    const database = client.db('callow'); // Replace with your database name
    const collection = database.collection('schools'); // Replace with your collection name

    // Find the document based on the School_name field
    const document = await collection.findOne({ School_name: schoolName });

    if (document) {
      return new Response(JSON.stringify(document), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(
        JSON.stringify({ message: 'No document found with the given school name.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing the request.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await client.close();
  }
}
