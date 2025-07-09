import { browser } from '$app/environment';
import { 
  customerId, 
  customerReferralCode, 
  customerCallowCoins,
  updateCustomerCoins
} from '$lib/components/ts/customer_correlated.svelte';

// Define the PendingOrder interface
export interface PendingOrder {
  id: string;
  name: string;
  quantity: number;
  actualPrice: number;
  currentPrice: number;
  coins_earned: number;
  cart_id: number | null;
}

// Initial state
let subtotal: number = $state(0);
let total_amount: number = $state(0);
let discount_amount: number = $state(0);
let promo_code: string | null = $state(null);
let promo_code_val: string | null = $state(null);
let payment_method: 1 | 2 = $state(1); // Default to cash (1)
let used_coin: number | null = $state(null);
let coin_balance: number | null = $state(null);
let loading: boolean = $state(false);
let customer_id: string | null = $state('');
let pending_order: PendingOrder | null = $state(null);
let institute_name: string | null = $state(null);
let coins_earned: number = $state(0);
let items_count: [string, number] | null = $state(null);
let assignment_id: string | null = $state(null);
let productName: string | null = $state(null)
let cart_id: number | null = $state(null)

export function get_total_amount(): number {
  return total_amount;
}

export function get_institute_name(): string | null{
	return institute_name;
}

export function get_subtotal(): number{
	return subtotal;
}

export function get_discount_amount(): number{
	return discount_amount;
}

export function get_used_coin(){
	return used_coin;
}



export function initializeCheckoutData(): void {
  const pendingOrderData = sessionStorage.getItem('pending_order');
  pending_order = pendingOrderData ? JSON.parse(pendingOrderData) : null;
  
  if (pending_order && pending_order.actualPrice && pending_order.quantity) {
    subtotal = Number(pending_order.actualPrice) * Number(pending_order.quantity);
    discount_amount = (Number(pending_order.actualPrice) - Number(pending_order.currentPrice)) * Number(pending_order.quantity);
    total_amount = subtotal - discount_amount;

	productName = pending_order.name;
  }

  if(pending_order && pending_order.cart_id){
	cart_id =  Number(pending_order?.cart_id);
  }


  customer_id = customerId();  
  
  institute_name = localStorage.getItem('institute_name') || '';
  
  if (pending_order?.id && pending_order?.quantity) {
    coins_earned = pending_order.coins_earned || 0;
    console.log("Coins earned:", typeof(coins_earned));
    items_count = [pending_order.id, pending_order.quantity];
  }
}

export function applyPromoCodeIfAvailable() {
	const hasDiscountPercentage = sessionStorage.getItem('discount_percentage');
	const hasDiscountAmount = sessionStorage.getItem('discountamount');
	
	if (hasDiscountPercentage || hasDiscountAmount) {
		promo_code = sessionStorage.getItem('coupon');
		assignment_id = sessionStorage.getItem('assignment_id');
		
		if (hasDiscountPercentage !== 'null') {
			const percentageDiscount = sessionStorage.getItem('discount_percentage');
			promo_code_val = percentageDiscount;
			total_amount = Math.floor(subtotal - (subtotal * (promo_code_val / 100)) - discount_amount);
			promo_code_val = `${Math.floor(promo_code_val)}%`;
		} else {
			const amountDiscount = sessionStorage.getItem('discountamount');
			promo_code_val = amountDiscount;
			// used ternary operator 
			total_amount = Math.floor(subtotal - parseInt(promo_code_val) - discount_amount) > 0 ? Math.floor(subtotal - parseInt(promo_code_val) - discount_amount) : 0;
			promo_code_val = `₹${promo_code_val}`;
		}
	}
}

export function handlePaymentMethodChange(isCashAndCoins: boolean): void {
	if (isCashAndCoins) {
		coin_balance = customerCallowCoins()?.B;
		
		if (coin_balance > total_amount) {
			used_coin = total_amount;
			coin_balance = coin_balance - used_coin;
			total_amount = 0;
		} else {
			used_coin = coin_balance;
			total_amount = total_amount - used_coin;
		}
	} else {
		// Reset coin usage if cash only
		used_coin = null;
		coin_balance = null;
		recalculateTotalWithoutCoins();
	}
}

function recalculateTotalWithoutCoins() {
	if (sessionStorage.getItem('discount_percentage') || sessionStorage.getItem('discountamount')) {
		applyPromoCodeIfAvailable();
	} else {
		promo_code = null;
		promo_code_val = null;
		total_amount = subtotal - discount_amount;
	}
}

export async function placeOrder(event : any) {
	event.target.disabled = true;
	loading = true;
	console.log("Placing order with the following details:", {
		customer_id,
		institute_name,
		items_count,
		discount_amount,
		promo_code,
		total_amount,
		payment_method,
		used_coin,
		coins_earned,
		productName,
		cart_id
	});
	try {
		const response = await fetch('/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				customer_id,
				institute_name,
				items_count,
				discount_amount,
				promo_code,
				total_amount,
				payment_method,
				used_coin,
				coins_earned,
				productName,
				cart_id
			})
		});
		
		if (response.status === 200) {
			handleSuccessfulOrder();
		}
	} catch (error) {
		console.error("Order placement failed:", error);
		loading = false;
		event.target.disabled = false;
	}
}

function handleSuccessfulOrder() {
	// Update coin balance if coins were used
	if (used_coin) {
		updateCustomerCoins(coin_balance - used_coin)
	}

	// handle cart
	if(cart_id){
		localStorage.removeItem('cart')
		markCartAsConverted(cart_id)
	}
	
	// Clear pending_order from session
	sessionStorage.removeItem('pending_order');
	
	// Handle promo code usage
	if (promo_code && promo_code !== 'WELCOME50') {
		updateCouponUsage();
	} else {
		handleWelcome50Coupon();
	}
}

function handleWelcome50Coupon() {
	if (promo_code === 'WELCOME50') {
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

async function updateCouponUsage() {
	try {
		const response = await fetch('/api/couponUsageUpdate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ assignment_id })
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