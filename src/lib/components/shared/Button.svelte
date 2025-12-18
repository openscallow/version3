<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 17/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 17/12/2025
 * Last change: initialize
 * 
*/

let {
    ButtonName="Button",
    Color="white", 
    BackgroudColor="#24a0ed", 
    Width="100%", 
    OnClick = ()=>{}
    } = $props()
</script>

<button 
    style:width={Width} 
    style:color={Color} 
    style:background-color={BackgroudColor} 
    onclick={()=> OnClick()}> 
    {ButtonName} 
</button>

<style>
    button {
        padding: 1rem;
        border-radius: var(--radius-lg);
        font-size: var(--font-size-button);
        font-weight: var(--font-weight-button);
        font-family: var(--font-family-button); 
        outline: none;
    }
</style>