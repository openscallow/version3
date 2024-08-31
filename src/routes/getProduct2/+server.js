import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from '../../aws-config';
import { error } from '@sveltejs/kit';

export async function GET() {
  const s3Client = new S3Client(awsConfig);

  const command = new GetObjectCommand({
    Bucket: 'callowproduct',
    Key: 'secondfile.json'
  });

  try {
    const response = await s3Client.send(command);
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'json',
        'Content-Disposition': 'inline; filename="secondfile.json"'
      }
    });
  } catch (err) {
    console.error('Error fetching image from S3:', err);
    throw error(500, 'Error fetching image from S3');
  }
}