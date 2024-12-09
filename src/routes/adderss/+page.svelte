<script>
  import '@tailwind'
  import Fuse from 'fuse.js'
  import { Search } from 'lucide-svelte'
  import { onMount } from 'svelte'

  // Data
  const institutes = [
    {
        institute: "Jay Ambe school",
        address: "12 Main Street, Surat",
        pincode: 395006,
        institute_code: 123,
        src: "https://raghavfoundation.org.in/wp-content/uploads/2023/05/school-image.jpg"
    },
    {
        institute: "Sunrise School",
        address: "45 Sunrise Avenue, Surat",
        pincode: 395007,
        institute_code: 124,
        src: "https://www.unicef.org/syria/sites/unicef.org.syria/files/styles/two_column/public/UNI597552.webp?itok=P6ELdDSX"
    },
    {
        institute: "Green Valley",
        address: "89 Green Lane, Surat",
        pincode: 395008,
        institute_code: 125,
        src: "https://www.unicef.org/syria/sites/unicef.org.syria/files/styles/hero_extended/public/UNI597570.webp?itok=ZZNjrnol"
    },
    {
        institute: "Bright Future",
        address: "123 Future Road, Surat",
        pincode: 395009,
        institute_code: 126,
        src: "https://www.unicef.org/syria/sites/unicef.org.syria/files/styles/media_large_image/public/UNI571006.webp?itok=jXnigvUs"
    },
    {
        institute: "Star Academy",
        address: "77 Star Boulevard, Surat",
        pincode: 395010,
        institute_code: 127,
        src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    },
    {
        institute: "Harmony School",
        address: "56 Harmony Street, Surat",
        pincode: 395011,
        institute_code: 128,
        src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
    }
];


  // Fuse.js options
  const options = {
    keys: ['institute', 'pincode', 'address'], 
    threshold: 0.3,
  }

  let fuse
  let searchQuery = ''
  let results = []

  onMount(() => {
    // Initialize Fuse.js
    fuse = new Fuse(institutes, options)
    // Show only the first 5 results by default
    results = institutes.slice(0, 5)
  })

  // Function to handle search input
  const handleSearch = (event) => {
    searchQuery = event.target.value
    results = searchQuery
      ? fuse.search(searchQuery).map(result => result.item)
      : institutes.slice(0, 5) // Limit to 5 when input is empty
  }

  function handleSelect(institute, institute_code){
    if(institute && institute_code){
      localStorage.setItem('institute_name', institute)
      localStorage.setItem('institute_code', institute_code)
    }
  }
</script>

<div class="container p-4">
  <label class="input input-bordered flex items-center gap-2">
    <input
      type="text"
      class="grow"
      placeholder="Search"
      oninput={handleSearch}
    />
    <Search class="h-4 w-4 opacity-70" />
  </label>

  <ul class="mt-4">
    {#if results.length}
      {#each results as result}
      <div class="card bg-base-100 w-full shadow-lg rounded-md mb-4">
        <figure>
          <img
            src={result.src}
            alt={result.institute} />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{result.institute}</h2>
          <p><strong> Address: </strong> {result.address}</p>
          <p><strong> Pincode: </strong> {result.pincode}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" onclick={()=>{handleSelect(result.institute, result.institute_code)}}>select</button>
          </div>
        </div>
      </div>
      
      {/each}
    {:else}
      <li class="text-gray-500">No results found</li>
    {/if}
  </ul>
</div>
