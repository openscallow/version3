import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';

dotenv.config()

import { algoliasearch } from "algoliasearch";

const appID = env.ALGOLIA_API_ID;
console.log(appID)

// API key with `addObject` and `editSettings` ACL
const apiKey = env.ALGOLIA_API_KEY;
console.log(apiKey)
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