/**
 * Created by: Gautam mer (CEO)
 * Created at: 31/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 31/12/2025
 * Last change: Initialize
 * 
*/
import { algoliasearch } from 'algoliasearch';
import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
dotenv.config();

let APP_ID = env.ALGOLIA_API_ID || process.env.ALGOLIA_API_ID;
let API_KEY = env.ALGOLIA_API_KEY || process.env.ALGOLIA_API_KEY;

export const searchClient = algoliasearch(APP_ID, API_KEY);