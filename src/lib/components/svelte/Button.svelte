<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 07/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 07/12/2025
 * Last change: initialize
 * 
*/

let {name="Button",color="white", backgroudColor="#24a0ed", width="100%", action = ()=>{}} = $props()
</script>

<button style:width style:color style:background-color={backgroudColor}  onclick={event => action(event)}>{name}</button>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

    button {
        padding: 1rem;
        border-radius: 2rem;
        font-family: "Roboto Condensed", sans-serif;
        font-weight: 400;
        font-size: 1.2rem;
        outline: none;
    }
</style>