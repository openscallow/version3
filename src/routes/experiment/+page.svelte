<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  let name;
  let mobile;
  
  function getUserData() {
      if (typeof sessionStorage !== 'undefined') {
          name = sessionStorage.getItem('name');
          mobile = sessionStorage.getItem('mobile');
          console.log(name, mobile);
      }
  }
  
  async function addUser() {
      try {
          const response = await fetch('/experiment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, mobile })
          });
          console.log('Response received')

          if (response.ok) {
              console.log('User added wsuccessfuly')
              if (typeof window !== 'undefined' && window.sessionStorage) {
                  console.log('We are definitely here!');
                  
                  let checkIsOrder = sessionStorage.getItem('userData');
                  console.log('Check is order:', checkIsOrder);
                  
                  if (checkIsOrder) {
                      console.log('Redirecting to order');
                      goto('/order');
                  } else {
                      console.log('Redirecting to home');
                      goto('/');
                  }
              } else {
                  console.log('SessionStorage not available');
                  goto('/');
              }

          } else {
              console.error('Failed to add user');
          }
      } catch (error) {
          console.error('Error adding user:', error);
      }
  }
  
  onMount(() => {
      getUserData();
      addUser();
  });
  </script>
  
 