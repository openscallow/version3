
import { env } from '$env/dynamic/private';

import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
const uri = env.MONGODBCLUSTER0 || process.env.MONGODBCLUSTER0;

export async function POST() {

    

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let school = 'hio'
  
    try {
      await client.connect();
  
      const database = client.db("callow"); // Replace with your database name
      const collection = database.collection("schools"); // Replace with your collection name
  
      // Update query to push a new school
      const filter = { _id: new ObjectId("67751bf53e8ea769987e72ea") }; // Convert string to ObjectId
      const update = {
        $push: { schools: school   } // Replace "New School Name" with the new school's name
      };
  
      const result = await collection.updateOne(filter, update);
  
      if (result.modifiedCount > 0) {
        console.log("School added successfully!");
        return new Response(JSON.stringify({ data: "ok work "}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
      } else {
        console.log("No document found with the given _id.");
        return new Response(JSON.stringify({ data: "not work" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
      }
    } finally {
      await client.close();
    }
  }

