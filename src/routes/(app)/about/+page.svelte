<script>
	import '@tailwind';
    // import { json } from 'stream/consumers';
    import { onMount } from 'svelte';
	onMount(async ()=>{

// 		try {
// 			let response = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
// 			method: "POST",
// 			body: JSON.stringify({
//   "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjNlMTJmZTMxNDczMGQ1Y2VjNDk5MyIsIm5hbWUiOiJDYWxsb3ciLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjkyM2UxMmZlMzE0NzMwZDVjZWM0OThlIiwiYWN0aXZlUGxhbiI6IkZSRUVfRk9SRVZFUiIsImlhdCI6MTc2Mzk1OTA4N30.49JrGF-B8Mw74YAWM9mM81BFUNn1COzOTZrUfgE86Y8",
//   "campaignName": "welcomeMessage",
//   "destination": "919574018290",
//   "userName": "Callow",
//   "templateParams": [
//     "$FirstName"
//   ],
//   "source": "new-landing-page form",
//   "media": {
//     "url": "https://callowproduct.s3.ap-south-1.amazonaws.com/productImag/whatsAppbanner.jpg",
//     "filename": "welcome callow banner"
//   },
//   "buttons": [],
//   "carouselCards": [],
//   "location": {},
//   "attributes": {},
//   "paramsFallbackValue": {
//     "FirstName": "user"
//   }
// })
// 		})

// 		if(response.ok){
// 			alert("fuck it works")
// 		}
// 		} catch (error) {
// 			console.log(error)
// 		}
		
		try {
  let response = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjNlMTJmZTMxNDczMGQ1Y2VjNDk5MyIsIm5hbWUiOiJDYWxsb3ciLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNjkyM2UxMmZlMzE0NzMwZDVjZWM0OThlIiwiYWN0aXZlUGxhbiI6IkZSRUVfRk9SRVZFUiIsImlhdCI6MTc2Mzk1OTA4N30.49JrGF-B8Mw74YAWM9mM81BFUNn1COzOTZrUfgE86Y8",
      campaignName: "welcomeMessage",
      destination: "919574018290",
      userName: "Callow",
      templateParams: ["user"], // or remove '$'
      source: "new-landing-page-form",
      media: {
        url: "https://callowproduct.s3.ap-south-1.amazonaws.com/productImag/whatsAppbanner.jpg",
        filename: "welcome callow banner"
      },
      buttons: [],
      carouselCards: [],
      location: {},
      attributes: {},
      paramsFallbackValue: {
        FirstName: "user"
      }
    })
  });

  if (response.ok) {
    alert("it works!");
  } else {
    console.log("Error:", await response.text());
  }
} catch (error) {
  console.log(error);
}


		





		
	})
	export let title = "About Us";
  </script>
  
  <div class="flex flex-col items-center justify-center py-10 bg-gradient-to-r from-blue-100 via-white to-blue-100 min-h-screen p-4">
	<div class="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
	  <div class="bg-primary text-white py-6 px-4 text-center">
		<h1 class="text-4xl font-bold">{title}</h1>
	  </div>
	  <div class="p-8 space-y-6">
		<p class="text-lg text-gray-700">
		  Welcome to <span class="font-semibold text-primary">Callow</span>, your one-stop shop for all things stationery!
		</p>
		<p class="text-lg text-gray-700">
		  We understand how important it is for students to have the right tools to ace their studies without breaking the bank. That’s why we’re here—to bring you a wide variety of high-quality stationery that’s affordable and perfect for every need, whether it’s for school, college, or your creative projects.
		</p>
		<p class="text-lg text-gray-700">
		  At Callow, we believe that great ideas start with the simplest things—a notebook, a pen, or even a sticky note. We’re all about making sure you have everything you need to stay organized, express yourself, and keep learning without any hassle.
		</p>
		<p class="text-lg text-gray-700">
		  We’re proud to call India our home and are dedicated to serving students across the country with products that fit your budget and your style.
		</p>
		<div class="text-center">
		  <p class="text-lg text-gray-700">
			Got a question or need help finding something? Reach out—we’re here for you. Let’s make studying a little more colorful, one page at a time!
		  </p>
		  <a href="/contact"><button class="btn btn-primary mt-4">Contact Us</button></a>
		</div>
	  </div>
	</div>
  </div>
  