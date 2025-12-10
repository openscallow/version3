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

let { type="text", 
      name="textField", 
      id="textField", 
      lable="lable",
      message= null, 
      value = $bindable()} = $props()
</script>

<div id="input-container">
    <label for={id}>{lable}</label>
    <input  bind:value={value} {type} {name} {id}>
    {#if message}
    <span class="message">{message}</span>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dongle&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
    #input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    #input-container label {
        color:white;
        font-size: 1rem;
        margin-left: 0.5rem;
        margin-bottom: 0.1rem;
        font-family: "Roboto Condensed", sans-serif;
    }

    #input-container input {
        padding: 1rem;
        font-size: 1rem;
        border-radius: 1rem;
        outline: none;
    }

    .message {
        color: rgba(255, 15, 15, 0.892);
    }
</style>