<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';
  import '@tailwind';

  export let images = [];
  export let height = '400px';

  let swiper;

  onMount(() => {
    if (images.length > 1) {
      swiper = new Swiper('.swiper-container', {
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        centeredSlides: true, // This ensures the active slide is centered
      });
    }
  });
</script>

<div class="slider w-full flex justify-center items-center overflow-hidden" style="height: {height};">
  {#if images.length === 0}
    <div class="no-image flex justify-center items-center w-full h-full bg-gray-200 text-gray-600">
      No image available
    </div>
  {:else if images.length === 1}
    <div class="flex justify-center items-center w-full h-full p-4">
      <img src={images[0]} alt="Product Image" class="slide-image max-w-full max-h-full object-contain border border-gray-300 rounded-lg shadow-sm"/>
    </div>
  {:else}
    <div class="swiper-container w-full h-full">
      <div class="swiper-wrapper">
        {#each images as image, index}
          <div class="swiper-slide flex justify-center items-center p-4">
            <img src={image} alt="Product Image {index + 1}" class="slide-image max-w-full max-h-full object-contain border border-gray-300 rounded-lg shadow-sm"/>
          </div>
        {/each}
      </div>
      <div class="swiper-pagination"></div>
    </div>
  {/if}
</div>

<style>
  :global(.swiper-pagination-bullet-active) {
    @apply bg-gray-800;
  }
</style>
