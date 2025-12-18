<script lang='ts'>
/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 12/12/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 17/12/2025
 * Last change: removed redundant variable open, formated code, incorporated props
 * 
*/

import { Star } from 'lucide-svelte';
import { getProductImageSrc } from '$lib/components/ts/getProductImageSrc';

let isCollapsed = $state(false)
let {productId, orderId, cratedAt, instituteName} = $props()
</script>
<article class="order-card">
    <button class="order-card__toggle-button" onclick={()=> isCollapsed = !isCollapsed}>
        <div class="order-card__summary">
            <section class="order-card__meta">
                <header class="order-card__meta-header">
                    <div class="order-card__id">Order ID: {orderId}</div>
                    <div class="order-card__date">{new Date(cratedAt).toDateString()}</div>
                </header>
                <p class="order-card__delivery-status">ETA: 10:30 AM - 10:40 AM, Tomorrow</p>
            </section>
            <section class="order-card__visuals">
                <div class="order-card__image-wrapper">
                    {#await getProductImageSrc(productId)}
                        <p>fetching product imag...</p>
                    {:then value}
                        <img src={value} alt="product short description" loading="lazy" />
                    {:catch error}
                        <p>Something went wrong: {error.message}</p>
                    {/await} 
                </div>
                <div class="order-card__rating">
                    <span class="order-card__rating-label">Your rating:</span>
                    <Star size={12} fill="orange" strokeWidth={0}/>
                    <Star size={12} fill="orange" strokeWidth={0}/>
                    <Star size={12} fill="orange" strokeWidth={0}/>
                    <Star size={12} fill="orange" strokeWidth={0}/>
                    <Star size={12} fill="orange" strokeWidth={0}/>
                </div>
            </section>
        </div>
    </button>
    {#if isCollapsed}
        <div class="order-card__additional-information">
            <dl class="order-card__detail-list">
                <div class="order-card__detail-item">
                    <dt class="order-card__detail-label">School:</dt>
                    <dd class="order-card__detail-value">{instituteName}</dd>
                </div>
            </dl>
            <div class="order-card__actions">
                <button>cancel</button>
            </div>
        </div>
    {/if}
</article>




<style>
    .order-card {
        width: 100%;
        padding: 0.1rem;
        border: 1px solid black;
        border-radius: var(--radius-sm);
    }

    .order-card__toggle-button {
        width: 100%;
        display: block;
        cursor: pointer;
        border: none;
        background: none;
    }

    .order-card__summary {
        width: 100%;
        height: 120px;
        display: flex;
    }

    .order-card__meta {
        flex: 3;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
    }

    .order-card__meta-header {
        display: flex;
        align-items: start;
        flex-direction: column;
    }

    .order-card__delivery-status {
        font-size: 12px;
        text-align:left;
    }

    .order-card__visuals {
        flex: 2;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .order-card__image-wrapper {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 80px;
        aspect-ratio: 1;
    }

    .order-card__image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }

    .order-card__rating {
        display: flex;
        font-size: 12px;
        align-items: center;
    }

    .order-card__additional-information {
        margin-top: 0.5rem;
        border-top: 1px solid black;
    }
</style>

