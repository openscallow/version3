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
    spaceBetween: 12,
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
        spaceBetween: 24,
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
  <div class="w-full max-w-full overflow-hidden bg-slate-900 bg-gradient-radial from-white via-[#1a202c]/60 to-[#1a202c] my-4 md:mx-4 md:rounded-md relative">
    <div class="flex items-center justify-between px-4 py-4">
      <h2 class="text-xl text-white">Recently Viewed</h2>
      <a href="/recently-viewed" class="flex items-center gap-1 text-white hover:opacity-80 transition-opacity lg:hidden">
        <ArrowRight size={25} />
      </a>
    </div>
    
    <div class="swiper-container">
      <div class="swiper-wrapper">
        {#each $recentlyViewed as item}
          <div class="swiper-slide px-2">
            <div class="tile">
              <a 
                href="/{item.id}" 
                rel="noopener noreferrer"
                class="block w-full h-full"
              >
                <div class="image-container relative aspect-[3/4] overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    class="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                <h3 class="mt-2 text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
              </a>
            </div>
          </div>
        {/each}
        
        <div class="swiper-slide px-2 hidden lg:flex">
          <a 
            href="/recently-viewed" 
            class="w-full flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
          >
            <div class="text-center p-8">
              <ArrowRightCircle 
                size={48} 
                class="mx-auto mb-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              />
              <span class="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                View All Items
              </span>
            </div>
          </a>
        </div>
      </div>
      
      <div class="hidden lg:block">
        <div class="swiper-button-prev !text-white !bg-black/50 rounded-full !w-10 !h-10 !left-2"></div>
        <div class="swiper-button-next !text-white !bg-black/50 rounded-full !w-10 !h-10 !right-2"></div>
      </div>
    </div>
    
    <div class="h-4" />
  </div>
{/if}

<style>
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
    /* Make tiles take full height of container */
    min-height: 280px;
  }

  /* Mobile-specific tile styles */
  @media (max-width: 1023px) {
    .tile {
      min-height: 320px;  /* Larger height on mobile */
    }

    .tile .image-container {
      height: 85%;  /* Make image container take up more space */
    }

    .tile h3 {
      font-size: 0.925rem;  /* Slightly larger text on mobile */
      margin-top: 0.75rem;
      padding: 0 0.25rem;
    }
  }

  :global(.swiper-wrapper) {
    margin: 0;
    padding: 0;
    /* Add height to ensure tiles stretch properly */
    height: auto !important;
    min-height: 320px;
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