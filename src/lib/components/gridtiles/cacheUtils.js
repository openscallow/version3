// cacheUtils.js

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export function getCachedProducts(endpoint) {
  const cachedData = localStorage.getItem(`products_${endpoint}`);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
}

export function setCachedProducts(endpoint, data) {
  console.log(data)
  const cacheItem = JSON.stringify({
    data,
    timestamp: Date.now()
  });
  localStorage.setItem(`products_${endpoint}`, cacheItem);
}

export async function getProductsWithCache(endpoint) {
  //check cach is available
  const cachedProducts = getCachedProducts(endpoint)
  if (cachedProducts) return cachedProducts

  //fetch product from server
  try {
    const response = await fetch(`./${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const products = await response.json()
    setCachedProducts(endpoint, products)
    console.log(endpoint, products)
    return products
  } catch (error) {
    console.error(`Failed to fetch products: ${error.message}`);
        return { error: error.message };
  }
}