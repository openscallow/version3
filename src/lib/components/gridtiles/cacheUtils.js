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
  const cacheItem = JSON.stringify({
    data,
    timestamp: Date.now()
  });
  localStorage.setItem(`products_${endpoint}`, cacheItem);
}

export async function getProductsWithCache(endpoint, fetchFunction) {
  const cachedProducts = getCachedProducts(endpoint);
  if (cachedProducts) {
    return cachedProducts;
  }
  
  const products = await fetchFunction(endpoint);
  setCachedProducts(endpoint, products);
  return products;
}