import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { awsConfig } from '../../../aws-config';
import { error } from '@sveltejs/kit';


export async function POST({ request }) {
    const s3Client = new S3Client(awsConfig);
    
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const fileName = formData.get('fileName') || 'default-name';
        
        if (!file) {
            throw error(400, { message: 'No file provided' });
        }

        // Log file details before upload
        console.log('Uploading file:', {
            name: fileName,
            type: file.type,
            size: formatFileSize(file.size)
        });

        // Generate a unique key using timestamp and original filename
        const timestamp = new Date().getTime();
        const uniqueKey = `${timestamp}-${fileName}`;

        // Read file as binary data
        const fileData = await file.arrayBuffer();
        const buffer = Buffer.from(fileData);

        const command = new PutObjectCommand({
            Bucket: 'callowproduct',
            Key: uniqueKey,
            Body: buffer,
            ContentType: file.type,
            Metadata: {
                originalName: fileName
            }
        });

        await s3Client.send(command);
        
        return new Response(
            JSON.stringify({ 
                success: true, 
                fileName: uniqueKey,
                size: formatFileSize(file.size)
            }), 
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (err) {
        console.error('Error uploading to S3:', err);
        throw error(500, { 
            message: 'Error uploading to S3',
            details: err.message
        });
    }
}

function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}