import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from '../../../aws-config';

export async function POST({ request }) {
    const s3Client = new S3Client(awsConfig);
    try {
        let formData = await request.formData();
        const file = formData.get('file');
        const fileData = await file.arrayBuffer();
        const buffer = Buffer.from(fileData);

        const command = new PutObjectCommand({
            Bucket: 'callowproduct',
            Key: `school/${file.name}`,
            Body: buffer,
            ContentType: file.type,
            ACL: "public-read",
        });

        await s3Client.send(command);
        return new Response()
    } catch (error) {
        console.error('Error uploading to S3:', error);
    }    
}