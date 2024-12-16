import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from '../../aws-config';
import { error } from '@sveltejs/kit';

export async function GET() {
  const s3Client = new S3Client(awsConfig);

  const command = new GetObjectCommand({
    Bucket: 'callowproduct',
    Key: 'fifthfile.json'
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
        'Content-Type': 'application/json',
        'Content-Disposition': 'inline; filename="fifthfile.json"'
      }
    });
  } catch (err) {
    console.error('Error fetching file from S3:', err);
    throw error(500, 'Error fetching file from S3');
  }
}
