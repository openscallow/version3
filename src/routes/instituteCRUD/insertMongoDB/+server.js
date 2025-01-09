import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
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
    const { institute } = await request.json();

    // Validate the institute data
    if (!institute || institute.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Invalid data format. Expected 6 fields.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Construct the record to insert into MongoDB
    const record = {
      School_name: institute[0],
      Address: institute[1],
      City: institute[2],
      State: institute[3],
      Pincode: institute[4],
      img: institute[5],
    };

    await client.connect();

    const database = client.db('callow'); // Replace with your database name
    const collection = database.collection('schools'); // Replace with your collection name

    // Insert the record into the collection
    const result = await collection.insertOne(record);

    if (result.insertedId) {
      console.log('Record inserted successfully with ID:', result.insertedId);
      return new Response(
        JSON.stringify({ message: 'Data inserted successfully!', id: result.insertedId }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to insert data.' }),
        {
          status: 500,
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
