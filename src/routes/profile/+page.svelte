<script>
    import { enhance } from '$app/forms';
    
    let uploading = false;
    let message = '';

    function handleSubmit() {
        uploading = true;
        message = 'Uploading...';
        
        return async ({ result }) => {
            if (result.type === 'success') {
                message = 'Upload successful!';
            } else {
                message = result.data?.error || 'Upload failed';
            }
            uploading = false;
        };
    }
</script>

<form 
    method="POST" 
    use:enhance={handleSubmit} 
    enctype="multipart/form-data"
>
    <input 
        type="file" 
        name="file" 
        accept="image/*"
        required
    />
    <button type="submit" disabled={uploading}>
        Upload
    </button>
</form>

{#if message}
    <p>{message}</p>
{/if}