/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 22/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 22/11/2025
 * Last change: initialize
 * 
*/

import { checkoutDataService } from './checkoutDataService';
import { customerCallowCoins, updateCustomerCoins } from '$lib/components/ts/customer_correlated.svelte';

export async function placeOrder(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    button.disabled = true;

    try {
        let checkoutData =  checkoutDataService()
        if(!checkoutData) return null
   
        const response = await fetch('/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(checkoutData)
		});

        if (response.status === 200) {
			handleSuccessfulOrder(checkoutData);
            window.location.href = '/';
		}
        
    } catch (error) {
        // TODO: insert betterstack log tail here 
        button.disabled = false;
    }

}

function handleSuccessfulOrder(checkoutData: any) {
    // Update coin balance if coins were used
    if (checkoutData.used_coin) {
        let customerCallow = customerCallowCoins()?.B;
        if (customerCallow) 

        updateCustomerCoins(customerCallow - checkoutData.used_coin)
    }

    // handle cart
    if(checkoutData.cart_id){
        localStorage.removeItem('cart')
        markCartAsConverted(checkoutData.cart_id)
    }
    
    // Clear pending_order from session
    sessionStorage.removeItem('pending_order');
    
    // Handle promo code usage
    if (checkoutData.promo_code && checkoutData.promo_code !== 'WELCOME50') {
        updateCouponUsage(checkoutData);
    } else {
        handleWelcome50Coupon(checkoutData);
    }
}

function handleWelcome50Coupon(checkoutData: any) {
    if (checkoutData.promo_code === 'WELCOME50') {
        document.cookie = "WELCOME50=true; max-age=3600; path=/";
    }
    
    // Clear coupon data and redirect
    clearCouponData();
    window.location.href = '/';
}

function clearCouponData() {
    sessionStorage.removeItem('discountamount');
    sessionStorage.removeItem('discount_percentage');
    sessionStorage.removeItem('coupon');
}

async function updateCouponUsage(checkoutData: any) {
    try {
        const response = await fetch('/api/couponUsageUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ assignment_id: checkoutData.assignment_id })
        });
        
        if (response.status === 200) {
            clearCouponData();
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Failed to update coupon usage:", error);
    }
}

async function markCartAsConverted(cart_id: any){
    try {
        const response = await fetch('/api/cart/markCartAsConverted', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart_id })
        });

        if(response.ok) {
            console.log("cart status change")
            return
        }
    
    } catch (error) {
        console.log(error)
    }
}