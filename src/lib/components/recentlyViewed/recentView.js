import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Maximum number of recently viewed items to store
const MAX_RECENT_ITEMS = 6;

// Initialize the store with data from localStorage if in browser environment
const initialValue = browser ? JSON.parse(localStorage.getItem('recentlyViewed')) ?? [] : [];
const recentlyViewed = writable(initialValue);

// Function to add an item to recently viewed
function addToRecentlyViewed(item) {
    recentlyViewed.update(items => {
        // Remove the item if it's already in the list
        const filteredItems = items.filter(i => i.id !== item.id);
        
        // Add the new item to the beginning of the array
        const updatedItems = [item, ...filteredItems];
        
        // Limit the array to MAX_RECENT_ITEMS
        return updatedItems.slice(0, MAX_RECENT_ITEMS);
    });
}

// Subscribe to changes in the recentlyViewed store
recentlyViewed.subscribe(value => {
    if (browser) {
        // Update localStorage with the new recently viewed items
        localStorage.setItem('recentlyViewed', JSON.stringify(value));
    }
});

// Function to clear all recently viewed items
function clearRecentlyViewed() {
    recentlyViewed.set([]);
}

// Function to remove a specific item from recently viewed
function removeFromRecentlyViewed(itemId) {
    recentlyViewed.update(items => items.filter(item => item.id !== itemId));
}

export { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed, removeFromRecentlyViewed };