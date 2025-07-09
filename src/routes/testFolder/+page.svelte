<script>
    import {cart} from '$lib/utils/cart/cart';
    
    async function someFunction() {
       console.log('some', await cart.id)
    }

    someFunction()

</script>
