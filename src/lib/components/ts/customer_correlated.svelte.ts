// File: $lib/components/ts/customer_correlated.ts
import { browser } from '$app/environment';

interface CustomerCoins {
  B: number;  // Balance
  U: number;  // Last updated timestamp
}

interface CustomerCorrelated {
  i: string;  // Customer ID
  r: string;  // Referral code
  cc?: CustomerCoins;
}

// Get customer ID from local storage
export function customerId(): string | null {
  if (!browser) return null;
  
  const customerData = getCustomerData();
  return customerData?.i || null;
}

// Get customer referral code from local storage
export function customerReferralCode(): string | null {
  if (!browser) return null;
  
  const customerData = getCustomerData();
  return customerData?.r || null;
}

// Get customer callow coins from local storage
export function customerCallowCoins(): CustomerCoins | null {
  if (!browser) return null;
  
  const customerData = getCustomerData();
  return customerData?.cc || null;
}

// Get full customer data from local storage
export function getCustomerData(): CustomerCorrelated | null {
  if (!browser) return null;
  
  try {
    const data = localStorage.getItem('customer_correlated');
    if (!data) return null;
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing customer data:', error);
    return null;
  }
}

// Update customer coins in local storage
export function updateCustomerCoins(balance: number): void {
  if (!browser) return;
  
  try {
    const customerData = getCustomerData() || { i: '', r: '' };
    
    const updatedData: CustomerCorrelated = {
      ...customerData,
      cc: {
        B: balance,
        U: Date.now()
      }
    };
    
    localStorage.setItem('customer_correlated', JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error updating customer coins:', error);
  }
}

// Check if coins are stale and need to be refreshed
export function areCoinsStale(): boolean {
  const coins = customerCallowCoins();
  if (!coins || !coins.U) return true;
  
  const lastUpdated = Date.now() - coins.U;
  return lastUpdated > 3600000; // 1 hour
}