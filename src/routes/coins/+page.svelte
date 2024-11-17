<script>
    import userMobile from '$lib/utils/getUserMobile.js';
    import referalCode from '$lib/utils/uuid.js';

    
        console.log(userMobile())
        console.log(`http://localhost:5173/signUp?search=${referalCode({parts : 2})}`)
    
</script>