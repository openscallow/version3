<script>
  import { run, preventDefault } from 'svelte/legacy';

    import '@tailwind';
    import { onMount } from 'svelte';
    import { ShieldCheck,  Camera  } from 'lucide-svelte';

    let file = $state();
    let loading = $state(false);
    let success = $state(false);
    let error = $state(null);
    let fileInfo = $state(null);

    


   

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

        // Check file size before upload (example: 10MB limit)
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
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

            const response = await fetch('/userProfile', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let imageUploader = await response.json()
                if (typeof window !== 'undefined') {
                    localStorage.setItem('profileImage', imageUploader.fileName);
                    updateDB();
                }
                
            } else{
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

    onMount(()=>{
        let indicator = document.getElementsByClassName("indicator")
        indicator[0].addEventListener("click", ()=>{
            document.getElementById("imageUploader").click()
        });
    })

    async function updateDB(){
        if (typeof window !== 'undefined') {
            let profile = localStorage.getItem('profileImage');
            let mobile = localStorage.getItem('mobile');

            const response = await fetch('/userProfile/api/imageUpdater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile, profile})
            });
        }
    }
    // Reactive declaration for file information
    run(() => {
    if (file && file[0]) {
          const selectedFile = file[0];
          fileInfo = {
              name: selectedFile.name,
              size: formatFileSize(selectedFile.size),
              type: selectedFile.type,
              rawSize: selectedFile.size  // Keep raw size for validation
          };

          // Add this part for image preview
      const imagePreview = document.getElementById('imagePreview');
      const objectURL = URL.createObjectURL(selectedFile);
      imagePreview.src = objectURL;
          // Log file details to console
          console.log('Selected file details:', {
              name: selectedFile.name,
              size: formatFileSize(selectedFile.size),
              type: selectedFile.type
          });
      } else {
          fileInfo = null;
      }
  });
</script>

<div class="w-full flex items-center justify-center px-2.5 mt-10">
  
    
    <form onsubmit={preventDefault(handleSubmit)} class=" form flex flex-col items-center gap-5">
        <div class="indicator cursor-pointer">
            <span class="indicator-item indicator-middle badge badge-neutral">+</span>
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img id="imagePreview" src="avtar.svg" alt="fuck alt" />
                </div>
            </div>
        </div>
        <div>
            <input id="imageUploader" type="file" accept="image/*" bind:files={file} required style="display:none" />
        </div>

        

        <button class="btn btn-neutral w-full rounded px-4 py-4 text-white text-[15px] transition-all duration-400 hover:bg-black hover:text-white focus:bg-black focus:text-white active:bg-black active:text-white" type="submit" disabled={loading || !file}>
            {loading ? 'Uploading...' : 'Upload'}
        </button>

        <div class="flex gap-2"><ShieldCheck /><p>your imagr is fully secured with us <a href="/" style="color: blue;">Learn more</a> </p></div>

        {#if success}
            <p style="color:green">File uploaded successfully!</p>
        {/if}

        {#if error}
            <p style="color: red">{error}</p>
        {/if}
    </form>
</div>

<style>
    .form {
    position: relative;
    filter: drop-shadow(0.5px 0.5px 1px var(--primary-color));
    border-radius: 5px;
    width: 360px;
    background-color: #ffffff;
    padding: 40px;
  }
</style>