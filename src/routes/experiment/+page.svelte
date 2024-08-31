<script>
  import { onMount } from 'svelte';
  
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
          const response = await fetch('/api', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, mobile })
          });
          if (response.ok) {
              const result = await response.json();
              console.log('User added with ID:', result.id);
              if (typeof sessionStorage !== 'undefined') {
                  let checkIsOrder = sessionStorage.getItem('userData');
                  if (checkIsOrder) {
                      console.log('User added with');
                      window.location.href = '../order';
                  } else {
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
      getUserData();
      addUser();
  });
  </script>
  
 