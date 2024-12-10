<script>
    import { page } from '$app/stores';
    import { productDatabase } from '$lib/json/product.js';

    const  url = $page.url.href;
    let updatedUrl = url.replace(/%20/g, ' ')
    let institute_name = updatedUrl.split('/').pop();


    let orders;
    async function retrivePending(institute_name){
        console.log('inside function')
        try {
            let response = await fetch('/associate/[slug]', {
                method: 'POST',
                headers: {
                    'Content-Type': 'applicaton/json'
                },
                body: JSON.stringify({institute_name})
            })

            console.log('response send')

            if(response.ok){
                let data = await response.json()
                orders = data.data
                console.log(orders)
            }else{
                console.log("something")
            }
        } catch (error) {
            console.log(error)
        }
    }

    retrivePending(institute_name)

</script>

{#if orders}
    {#each orders as order}

    <br>
        {productDatabase[order.items_count[0]].name}
    {/each}
{/if}
