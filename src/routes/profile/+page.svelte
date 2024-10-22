<script>
    let file;
    let loading = false;
    let success = false;
    let error = null;
    let fileInfo = null;

    // Reactive declaration for file information
    $: if (file && file[0]) {
        const selectedFile = file[0];
        fileInfo = {
            name: selectedFile.name,
            size: formatFileSize(selectedFile.size),
            type: selectedFile.type,
            rawSize: selectedFile.size  // Keep raw size for validation
        };
        // Log file details to console
        console.log('Selected file details:', {
            name: selectedFile.name,
            size: formatFileSize(selectedFile.size),
            type: selectedFile.type
        });
    } else {
        fileInfo = null;
    }

    function formatFileSize(bytes) {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async function handleSubmit() {
        if (!file || !file[0]) {
            error = 'Please select a file';
            return;
        }

        // Check file size before upload (example: 5MB limit)
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
        if (fileInfo.rawSize > MAX_SIZE) {
            error = `File size exceeds ${formatFileSize(MAX_SIZE)} limit`;
            return;
        }

        loading = true;
        success = false;
        error = null;
        
        try {
            const formData = new FormData();
            formData.append('file', file[0]);
            formData.append('fileName', file[0].name);  // Send original filename

            const response = await fetch('/putImage', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            success = true;
            file = null;
            fileInfo = null;
        } catch (err) {
            error = err.message || 'Failed to upload file. Please try again.';
            console.error('Upload error:', err);
        } finally {
            loading = false;
        }
    }
</script>

<div class="container">
    <h1>File Upload</h1>
    
    <form on:submit|preventDefault={handleSubmit}>
        <div>
            <input 
                type="file"
                accept="image/*"
                bind:files={file}
                required
            />
        </div>

        {#if fileInfo}
            <div>
                <p>File Name: {fileInfo.name}</p>
                <p>Size: {fileInfo.size}</p>
                <p>Type: {fileInfo.type}</p>
            </div>
        {/if}

        <button type="submit" disabled={loading || !file}>
            {loading ? 'Uploading...' : 'Upload'}
        </button>

        {#if success}
            <p>File uploaded successfully!</p>
        {/if}

        {#if error}
            <p style="color: red">{error}</p>
        {/if}
    </form>
</div>