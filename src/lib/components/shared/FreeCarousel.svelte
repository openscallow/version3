<script lang="ts">
/**
 * Created by: Gautam mer (CEO)
 * Created at: 25/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 25/12/2025
 * Last change: initialize
*/
import { onMount } from 'svelte';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let {children, slidesPerView=1, swiperPadding='0', swiperBackground='transparent'} = $props()

onMount(()=>{
    const swiper = new Swiper('.swiper', {
        slidesPerView,
        spaceBetween: 3,
        freeMode: {
            enabled: true,
            sticky: false,
            momentumRatio: 0.25,
            momentumVelocityRatio: 0.5,
        },
        grabCursor: true,
        mousewheel: true,
        breakpoints: {
            1024: {
                slidesPerView: 7.3,
                spaceBetween: 10,
            }
        }
    });
})

</script>

<div class="swiper" style:padding={swiperPadding} style:background-color={swiperBackground}>
    <div class="swiper-wrapper">
        {@render children()}
    </div>
</div>




