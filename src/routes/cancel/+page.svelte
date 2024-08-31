<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
   

    const idx = $page.url.search.substring(1);
    console.log(idx)


    
  
    
    async function addUser() {
      console.log(idx)
        try {
            const response = await fetch('/api4', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idx})
            });
            console.log(response);
            if (response.ok) {
                const result = await response.json();
                console.log('User added with ID:', result.id);
                if (typeof sessionStorage !== 'undefined') {
                    let checkIsOrder = sessionStorage.getItem('userData');
                    if (checkIsOrder) {
                        console.log('User added with');

                        window.location.href = '/';
                        
                    } 
                }
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
    
    onMount(() => {
        addUser();
    });
    </script>
    
   