<script>
  import '@tailwind'
  import { Search } from 'lucide-svelte'

  // Data
  let institutes = [
    {
      School_name: "Development Classes",
      Address: "Shivam Apartment, Rander road, near Navyug College, Adajan, Surat, Gujarat",
      Pincode: 395009,
      objectID: 6,
      img: "DevelopmentClass.jpg"
    },
    {
      School_name: "Nagar Prathamik School",
      Address: "173, Gajera circle, Near Lake Garden, Minaxi Wadi, Katargam, Surat, Gujarat",
      Pincode: 395004,
      objectID: 1,
      img: "govermentSchoolGajera.webp"
    }
  ];

  let searchQuery = "";

  async function handleSearch() {
    if(searchQuery.length > 5) {
      institutes = null;
      // Fetch data from API
      let response = await fetch('/adderss',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({searchQuery})
      })
      if(response.ok) {
        institutes = await response.json()
      }else{
        institutes = []
      }
    }
  }

  function handleSelect(School_name, objectID) {
    if (School_name && objectID) {
      localStorage.setItem('institute_name', School_name);
      localStorage.setItem('institute_code', objectID);
      window.location.href = '/checkout';
    }
  }
</script>

<div class="container p-4">
  <label class="input input-bordered flex items-center gap-2">
    <input
      type="text"
      class="grow"
      placeholder="Search"
      bind:value={searchQuery}
      onkeydown={(e) => e.key === 'Enter' && handleSearch()} />
    <Search 
      class="h-4 w-4 opacity-70 cursor-pointer" 
      onclick={handleSearch} />
  </label>

  <ul class="mt-4">
    {#if institutes}     
    {#if institutes.length}
      {#each institutes as result}
      <div class="card bg-base-100 w-full shadow-lg rounded-md mb-4">
        <figure>
          <img
            loading="lazy"
            src="https://callowproduct.s3.ap-south-1.amazonaws.com/school/{result.img}"
            alt={result.School_name} />
        </figure>
        <div class="card-body text-black bg-white rounded-b-md">
          <h2 class="card-title">{result.School_name}</h2>
          <p><strong> Address: </strong> {result.Address}</p>
          <p><strong> Pincode: </strong> {result.Pincode}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-neutral" onclick={()=>{handleSelect(result.School_name, result.objectID)}}>select</button>
          </div>
        </div>
      </div>
      
      {/each}
    {:else}
      <li class="text-gray-500">No institutes found</li>
    {/if}
    {:else}
      <div class="flex justify-center">
        <span class="loading loading-spinner loading-md"></span>
      </div>
    {/if}
  </ul>
</div>
