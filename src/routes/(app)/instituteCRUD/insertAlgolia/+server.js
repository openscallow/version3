import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';

dotenv.config()

import { algoliasearch } from "algoliasearch";

const appID = env.ALGOLIA_API_ID || process.env.ALGOLIA_API_ID;

// API key with `addObject` and `editSettings` ACL
const apiKey = env.ALGOLIA_API_KEY || process.env.ALGOLIA_API_KEY;

const indexName = "list";

const client = algoliasearch(appID, apiKey);

export async function POST({request}) {
    
    let { institute }= await request.json();
    const record = {
        School_name: institute[0],
        Address: institute[1],
        City: institute[2],
        State: institute[3],
        Pincode: institute[4],
        img: institute[5]
    };

    const { taskID } = await client.saveObject({
        indexName,
        body: record,
      });

    await client.waitForTask({
        indexName,
        taskID,
    });

    console.log(institute)
    return new Response(JSON.stringify({ message: 'Data received successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    }); 
}