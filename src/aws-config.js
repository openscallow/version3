// export const awsConfig = {
//   region: 'ap-south-1',
//   credentials: {
//     accessKeyId: "AKIAZQ3DRTNPTI6P7YQU",
//     secretAccessKey : "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"
//   }
// };
import { env } from '$env/dynamic/private';

export const awsConfig = {
  region: 'ap-south-1',
  credentials: {
    accessKeyId: env.BUCKET_ACCESS_KEY_ID,
    secretAccessKey: env.BUCKET_SECRET_ACCESS_KEY
  }
};