<script>
    import '@tailwind';

    let selectedImageSrc = "https://edexec.co.uk/wp-content/uploads/2021/01/school-building-modern-thin-line-design-style-vector-illustration-vector-id1030995160.jpg"; // Default image source

    function updateImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                selectedImageSrc = reader.result; // Update the image source
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<main class="p-4">
    <div class="card bg-base-100 w-full shadow-lg rounded-md mb-4">
        <figure>
            <img
                loading="lazy"
                src={selectedImageSrc}
                alt="Selected"
                class="w-full h-auto"
            />
        </figure>
       
        <div class="card-body text-black bg-white rounded-b-md">
            <input type="file" id="file" accept="image/*" class="file-input file-input-bordered w-full max-w-xs" onchange={updateImage}/>
            <h2 class="card-title border-b-2 border-black">school name: <span contenteditable></span></h2>
            <p class="border-b-2 border-black"><strong>Address/સરનામું:</strong> <span contenteditable></span></p>
            <p class="border-b-2 border-black"><strong>Pincode:</strong> <span contenteditable></span></p>
            <p class="border-b-2 border-black"><strong>શાળા શરૂ થવાનો સમય:</strong> <span contenteditable></span></p>
            <p class="border-b-2 border-black"><strong>Break time:</strong> <span contenteditable></span></p>
            <p class="border-b-2 border-black"><strong>શાળા બંધ થવાનો સમય</strong> <span contenteditable></span></p>
            <div class="card-actions justify-end">
                <button class="btn btn-neutral">Done</button>
            </div>
        </div>
    </div>
</main>
