import { env } from '$env/dynamic/private';

import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;


const dbConfig = {
    user: process.env.USERX,
    host: process.env.HOST || env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}; 

export const pool = new Pool(dbConfig);