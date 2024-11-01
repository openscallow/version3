<script>
    import { onMount } from 'svelte';
    
    let name;
    let mobile;
    let address;
    let product;
    let index;

    
    function getUserData() {
        if (typeof localStorage !== 'undefined') {
            name = localStorage.getItem('user');
            mobile = localStorage.getItem('mobile');
            address = localStorage.getItem('userAddress');
            let productObj =JSON.parse(sessionStorage.getItem("userData"));
            index = `${productObj.index}`;
            product = `${productObj.items}`
            console.log(name, mobile, address, product, index);
        }
    }
    
    async function addUser() {
        console.log(name, mobile, address, product, index);
        try {
            const response = await fetch('/experiment2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, mobile, address, product, index})
            });
            console.log(response);
            if (response.ok) {
                // const result = await response.json();
                // console.log('User added with ID:', result.id);
                if (typeof sessionStorage !== 'undefined') {
                    let checkIsOrder = sessionStorage.getItem('userData');
                    if (checkIsOrder) {
                        console.log('User added');

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
        // console.log(index)
        addUser();
    });
    </script>
    
   