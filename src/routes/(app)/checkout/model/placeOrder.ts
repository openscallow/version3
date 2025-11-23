/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 22/11/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 23/11/2025
 * Last change: refactored whole file
 * 
*/
import logtail from '$config/logtail.client';
import {getBrowserInfo} from '$lib/utils/browserDetection';
import { checkoutDataService } from './checkoutDataService';
import { customerCallowCoins, updateCustomerCoins } from '$lib/components/ts/customer_correlated.svelte';

// Constants
const API_ENDPOINTS = {
    CHECKOUT: '/checkout',
    COUPON_USAGE: '/api/couponUsageUpdate',
    MARK_CART_CONVERTED: '/api/cart/markCartAsConverted'
} as const;

const STORAGE_KEYS = {
    CART: 'cart',
    PENDING_ORDER: 'pending_order',
    DISCOUNT_AMOUNT: 'discountamount',
    DISCOUNT_PERCENTAGE: 'discount_percentage',
    COUPON: 'coupon'
} as const;

const PROMO_CODES = {
    WELCOME50: 'WELCOME50'
} as const;

const browserInfo = getBrowserInfo()

// Types
interface CheckoutData {
    used_coin?: number;
    cart_id?: string;
    promo_code?: string;
    assignment_id?: string;
}

// Main handler
export async function placeOrder(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    button.disabled = true;

    const checkoutData = checkoutDataService();
    if (!checkoutData) {
        button.disabled = false;
        return;
    }

    try {
        // @ts-ignore
        const response = await fetchCheckout(checkoutData);
        
        if (response.ok) {
            // @ts-ignore
            await handleSuccessfulOrder(checkoutData);
            redirect('/');
        } else {
            button.disabled = false;
            logtail.error("Order processing aborted due to invalid server response.", {checkoutData, browserInfo})
            await logtail.flush()
        }
    } catch (error) {
        button.disabled = false;
        logtail.error("Order processing aborted due error", {error, checkoutData, browserInfo})
        await logtail.flush()
    }
}

// API Calls
async function fetchCheckout(checkoutData: CheckoutData) {
    return fetch(API_ENDPOINTS.CHECKOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData)
    });
}

async function updateCouponUsage(assignmentId: string) {
    return fetch(API_ENDPOINTS.COUPON_USAGE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId })
    });
}

async function markCartAsConverted(cartId: string) {
    return fetch(API_ENDPOINTS.MARK_CART_CONVERTED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id: cartId })
    });
}

// Order Processing
async function handleSuccessfulOrder(checkoutData: CheckoutData) {
    await Promise.all([
        handleCoinUpdate(checkoutData),
        handleCart(checkoutData),
        handlePromoCode(checkoutData)
    ]);

    clearPendingOrder();
}

async function handleCoinUpdate(checkoutData: CheckoutData) {
    if (!checkoutData.used_coin) return;

    const customerCallow = customerCallowCoins()?.B;
    if (customerCallow) {
        updateCustomerCoins(customerCallow - checkoutData.used_coin);
    }
}

async function handleCart(checkoutData: CheckoutData) {
    if (!checkoutData.cart_id) return;

    removeStorage(STORAGE_KEYS.CART);
    await markCartAsConverted(checkoutData.cart_id);
}

async function handlePromoCode(checkoutData: CheckoutData) {
    if (!checkoutData.promo_code) return;

    if (checkoutData.promo_code === PROMO_CODES.WELCOME50) {
        setWelcome50Cookie();
    } else {
        await updateCouponUsage(checkoutData.assignment_id || '');
    }

    clearCouponData();
}

// Storage & Cookie Management
function clearPendingOrder() {
    removeStorage(STORAGE_KEYS.PENDING_ORDER);
}

function clearCouponData() {
    removeStorage(STORAGE_KEYS.DISCOUNT_AMOUNT);
    removeStorage(STORAGE_KEYS.DISCOUNT_PERCENTAGE);
    removeStorage(STORAGE_KEYS.COUPON);
}

function removeStorage(key: string) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
}

function setWelcome50Cookie() {
    document.cookie = `${PROMO_CODES.WELCOME50}=true; max-age=3600; path=/`;
}

// Navigation
function redirect(path: string) {
    window.location.href = path;
}