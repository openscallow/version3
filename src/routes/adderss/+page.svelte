<script>
  import '@tailwind'
  import Fuse from 'fuse.js'
  import { Search } from 'lucide-svelte'
  import { onMount } from 'svelte'

  // Data
  const institutes = [
    {
        institute: "Development Classes",
        address: "Shivam Apartment, Rander road, near Navyug College, Adajan, Surat, Gujarat",
        pincode: 395009,
        institute_code: 6,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/DevelopmentClass.jpg"
    },
    {
        institute: "Nagar Prathamik School",
        address: "173, Gajera circle, Near Lake Garden, Minaxi Wadi, Katargam, Surat, Gujarat",
        pincode: 395004,
        institute_code: 1,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/govermentSchoolGajera.webp"
    },
    {
        institute: "Matrubhumi Vidhya Bhavan",
        address: "Ved Road, Navjivan Society, Katargam, Surat, Gujarat",
        pincode: 395004,
        institute_code: 2,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/matrubhumischool.webp"
    },
    {
        institute: "Sulabh classes",
        address: "Gurukul Road, 3rd floor, apple square, Dabholi char rasta, near Matrubhumi Vidhya Bhavan, Surat, Gujarat ",
        pincode: 395004,
        institute_code: 3,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/sulabha+class.webp"
    },
    {
        institute: "V.T Choksi English Medium School",
        address: "Sumul dairy road, katargam, Surat, Gujarat",
        pincode: 395004,
        institute_code: 4,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/VTCHOKSI.webp"
    },
    {
        institute: "J.H.B Sardar High School",
        address: "New Rander Road, sugam society, Adajan Patiya, Surat, Gujarat",
        pincode: 395005,
        institute_code: 5,
        src: "https://callowproduct.s3.ap-south-1.amazonaws.com/school/JHB+SARDAR.webp"
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
      window.location.href = '/checkout'
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
            loading="lazy"
            src={result.src}
            alt={result.institute} />
        </figure>
        <div class="card-body text-black bg-white rounded-b-md">
          <h2 class="card-title">{result.institute}</h2>
          <p><strong> Address: </strong> {result.address}</p>
          <p><strong> Pincode: </strong> {result.pincode}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-neutral" onclick={()=>{handleSelect(result.institute, result.institute_code)}}>select</button>
          </div>
        </div>
      </div>
      
      {/each}
    {:else}
      <li class="text-gray-500">No results found</li>
    {/if}
  </ul>
</div>
