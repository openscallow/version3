import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function GET() {
    console.log('inside recentDrops');
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect to MongoDB
    await client.connect();

    console.log('Connected to MongoDB');
    // Use your desired database and collection.
    const database = client.db('callow'); // Replace with your database name if different
    const collection = database.collection('products'); // Replace with your products collection name
    console.log('Connected to collection');
    // Query for products marked as new.
    // Optionally, sort by createdAt descending to get the most recently added products first.
    const query = { isNew: true };
    const options = {
    //   sort: { createdAt: -1 }, // optional: sorts by the creation date in descending order
      limit: 6,
    };

    const newProducts = await collection.find(query, options).toArray();

    console.log('Retrieved new products:', newProducts);
    return new Response(
      JSON.stringify({ products: newProducts }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error retrieving new products:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while retrieving new products.' }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
        },
      }
    );
  } finally {
    await client.close();
  }
}
