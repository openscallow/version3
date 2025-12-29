<script lang='ts'>
/**
 * Created by: Gautam mer (CEO)
 * Created at: 28/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 28/12/2025
 * Last change: initialize
 * 
*/
import { onMount } from 'svelte';
import {  Telescope, IndianRupee } from 'lucide-svelte';
import Carousel from '$lib/components/shared/FreeCarousel.svelte';    

interface RelatedProducts {
    id: string,
    image: string,
    name: string,
    view: number,
    mrp: number,
    currentPrice: number,
    discount: number
}

let relatedProducts: RelatedProducts[] = $state([]); 
let props = $props();

onMount(async()=>{
    try {
        let response =  await fetch('/api/product-detail-page/relatedProduct', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({objectID: props.objectID})
        })

        if(response.ok) {
            relatedProducts = await response.json()
            $inspect(relatedProducts, "froom")
        }
    } catch (error) {
        throw new Error("hit error while fetching relative product")
    }
})

</script>


<Carousel slidesPerView={2.5} swiperPadding="0.5rem" swiperBackground="white">
    {#each relatedProducts as relatedProduct}
        <div class="swiper-slide">
            <a href={`/${relatedProduct.name.replaceAll(" ","-").replaceAll(".", "-")}/product/${relatedProduct.id}`} class="full-slide-link" aria-label="View Details"></a>
            <div class="slide_image-wrapper">
                <img src={relatedProduct.image} alt="">
            </div>
            
            <div class="slide_meta-data">
                <h3 class="product-title">{relatedProduct.name}</h3>
                <span class="view-count"><Telescope size={16}/> {relatedProduct.view} Views</span>
                
                <div class="pricing-container">
                    <div class="discount-tag">-{relatedProduct.discount}%</div>
                    <div class="current-price"><sub><IndianRupee size={10}/></sub> {relatedProduct.currentPrice} </div>
                </div>
                
                <div class="mrp-container">
                    M.R.P: <del>₹{relatedProduct.mrp}</del>
                </div>
            </div>
        </div>
    {/each}
</Carousel>

<style>
	.swiper-slide {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
	}

	.full-slide-link{
		position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 5; 
        cursor: pointer;
	}
	

	.swiper-slide  .slide_image-wrapper {
		width: 100%;
		flex: 0 0 150px;
		overflow: hidden;
	}

	.slide_image-wrapper img{
		width: 100%;
		height: 100%;
		object-fit: scale-down; 
		display: block;
		/* background-color: white; */
	}

	.swiper-slide .slide_meta-data {
		flex: 1;
	}

	.slide_meta-data h3 {
		color:darkblue;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;  
		line-clamp: 2;
		overflow: hidden;
		word-break: break-word;
		height: auto; 
	}

	.slide_meta-data  .view-count {
		display: flex;
		align-items: center;
		font-size: 14px;
		gap:5px;
	}

	.pricing-container {
		display: flex;
		gap:7px;
	}

	.discount-tag {
		color: rgb(220, 0, 0);
		font-weight: 300;
	}
	.current-price{
		display: flex;
	}

	.mrp-container {
        font-size: 12px;
        color: #565959;
        font-weight: 400;
    }

    .mrp-container del {
        margin-left: 2px;
    }
</style>

