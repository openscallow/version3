import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { json } from '@sveltejs/kit';
import { awsConfig } from '../../../aws-config';

const s3Client = new S3Client(awsConfig);

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return fail(400, { error: 'No file uploaded' });
        }

        try {
            const command = new PutObjectCommand({
                Bucket: 'your-bucket-name',
                Key: file.name,
                Body: await file.arrayBuffer(),
                ContentType: file.type
            });

            await s3Client.send(command);
            return { success: true };
        } catch (error) {
            return fail(500, { error: error.message });
        }
    }
};