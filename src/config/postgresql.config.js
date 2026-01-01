/**
 * Created by: Gautam mer (CEO)
 * Created at: 01/01/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 01/01/2025
 * Last change: Initialize
 * 
*/

import { env } from '$env/dynamic/private';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const dbConfig = {
    user: process.env.USERX || env.USERX,
    host: process.env.HOST || env.HOST,
    database: process.env.DATABASE || env.DATABASE,
    password: process.env.PASSWORD || env.PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}; 

const { Pool } = pkg;

export const pool = new Pool(dbConfig);

