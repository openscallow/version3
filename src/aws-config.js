import { env } from '$env/dynamic/private';
import 'dotenv/config';

const accessKeyId = process.env.BUCKET_ACCESS_KEY_ID 
  ? process.env.BUCKET_ACCESS_KEY_ID 
  : env.BUCKET_ACCESS_KEY_ID;

const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY 
  ? process.env.BUCKET_SECRET_ACCESS_KEY 
  : env.BUCKET_SECRET_ACCESS_KEY;

export const awsConfig = {
  region: 'ap-south-1',
  credentials: {
    accessKeyId,
    secretAccessKey
  }
};
