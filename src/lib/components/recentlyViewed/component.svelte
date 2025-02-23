<script>
  import { recentlyViewed } from '$lib/components/recentlyViewed/recentView.js';
  import { onMount } from 'svelte';
  import Swiper from 'swiper/bundle';
  import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
  import { ArrowRight, ArrowRightCircle } from 'lucide-svelte';
  
  import 'swiper/css/bundle';
  import '$lib/components/gridtiles/style.css';
  import '@tailwind';

  const swiperConfig = {
    modules: [Navigation, FreeMode, Mousewheel],
    loop: false,
    slidesPerView: 3,
    spaceBetween: 3,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumRatio: 0.25,
      momentumVelocityRatio: 0.5,
    },
    grabCursor: true,
    mousewheel: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      enabled: false,
    },
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: {
          enabled: true,
        },
      },
    },
  };

  onMount(() => {
    const swiper = new Swiper('.swiper-container', swiperConfig);
    swiper.params.touchRatio = 1;
    swiper.params.touchAngle = 45;
  });
</script>

{#if $recentlyViewed.length > 2}
  <div class="recently-viewed-container relative w-full">
    <div class="w-full max-w-full bg-slate-900 bg-gradient-radial from-white via-[#1a202c]/60 to-[#1a202c] my-4 md:mx-4 md:rounded-md">
      <div class="flex items-center justify-between px-4 py-4">
        <h2 class="text-xl text-white">Recently Viewed</h2>
        <!-- Show View all link only on mobile -->
        <a href="/recently-viewed" class="flex items-center gap-1 text-white hover:opacity-80 transition-opacity lg:hidden">
          <ArrowRight size={25} />
        </a>
      </div>
      
      <div class="swiper-container">
        <div class="swiper-wrapper">
          {#each $recentlyViewed as item}
            <div class="swiper-slide p-0 rounded-sm my-2">
              <div class="tile mt-2">
                <a 
                  href="/{item.name.replaceAll(" ","-").replaceAll(".", "-")}/product/{item.id}" 
                  rel="noopener noreferrer"
                  class="block"
                >
                  <div class="image-container relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      class="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                  
                </a>
              </div>
            </div>
          {/each}
          
          <!-- Symmetric end slide for desktop view -->
          <div class="swiper-slide p-0 rounded-sm my-2 hidden lg:block">
            <div class="tile mt-2">
              <a 
                href="/recently-viewed" 
                class="block h-full group"
              >
                <div class="image-container relative overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors h-full">
                  <div class="absolute inset-0 flex items-center justify-center flex-col">
                    <ArrowRightCircle 
                      size={48} 
                      class="text-gray-400 group-hover:text-gray-600 transition-colors"
                    />
                    <span class="mt-4 text-md font-medium text-gray-500 group-hover:text-gray-700 block">
                      View All Items
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Navigation arrows - only visible on desktop -->
        <div class="hidden lg:block">
          <div class="swiper-button-prev !text-white !bg-black/50 rounded-full !w-10 !h-10 !left-2"></div>
          <div class="swiper-button-next !text-white !bg-black/50 rounded-full !w-10 !h-10 !right-2"></div>
        </div>
      </div>
      
      <div class="h-4"></div>
    </div>
  </div>
{/if}

<style>
  .recently-viewed-container {
    overflow-x: clip;
  }

  :global(.swiper-container) {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 0 1rem;
    cursor: grab;
  }

  :global(.swiper-container:active) {
    cursor: grabbing;
  }

  :global(.swiper-slide) {
    height: auto;
    display: flex;
    align-items: stretch;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .tile {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :global(.swiper-wrapper) {
    margin: 0;
    padding: 0;
  }

  :global(.swiper-button-prev),
  :global(.swiper-button-next) {
    opacity: 0.8;
    transition: opacity 0.2s;
  }

  :global(.swiper-button-prev:hover),
  :global(.swiper-button-next:hover) {
    opacity: 1;
  }

  :global(.swiper-button-prev::after),
  :global(.swiper-button-next::after) {
    font-size: 1.5rem !important;
  }

  :global(.swiper-container *) {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
</style>