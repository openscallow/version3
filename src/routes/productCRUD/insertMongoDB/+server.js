// +server.js
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
    // Parse the incoming JSON payload
    const product = await request.json();

    // Validate required fields
    if (
      !product["Product Name"] ||
      !product["Category"] ||
      !product["Brand"] ||
      !product["Description"] ||
      !product["MRP"] ||
      !product["Current Price"] ||
      !product["Stock Availability"]
    ) {
      return new Response(
        JSON.stringify({ error: 'Invalid data format. Missing required fields.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Construct the record for insertion, converting numeric fields as needed.
    const record = {
      productName: product["Product Name"],
      category: product["Category"],
      brand: product["Brand"],
      description: product["Description"],
      color: product["Color"] || "",
      sizeAndDimensions: product["Size/Dimensions"] || "",
      material: product["Material"] || "",
      weight: product["Weight"] || "",
      mrp: parseFloat(product["MRP"]),
      currentPrice: parseFloat(product["Current Price"]),
      stockAvailability: parseInt(product["Stock Availability"], 10),
      viewCount: 0,
      purchaseCount: 0,
      images: Array.isArray(product["Images"])
        ? product["Images"].filter((url) => url.trim() !== '')
        : [],
      tags: Array.isArray(product["Tags"])
        ? product["Tags"].filter((tag) => tag.trim() !== '')
        : [],
      relatedProducts: Array.isArray(product["Related Products"])
        ? product["Related Products"].filter((id) => id.trim() !== '')
        : []
    };

    await client.connect();
    const database = client.db('callow'); // Replace with your actual database name if different
    const collection = database.collection('products'); // Using "products" for the collection name

    // Insert the record into MongoDB
    const result = await collection.insertOne(record);

    if (result.insertedId) {
      console.log('Product inserted successfully with ID:', result.insertedId);
      return new Response(
        JSON.stringify({ message: 'Product inserted successfully!', id: result.insertedId }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to insert product.' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error inserting product:', error);
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
