// Cache to avoid re-parsing user agent multiple times
let cachedResult = null;

function parseUserAgent() {
    // Return cached result if already computed
    if (cachedResult) {
        return cachedResult;
    }

    const userAgent = navigator.userAgent;
    const userAgentLower = userAgent.toLowerCase();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const width = window.innerWidth;

    // Detect browser
    let browser;
    if (/edg/i.test(userAgent)) {
        browser = "Microsoft Edge";
    } else if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
        browser = "Google Chrome";
    } else if (/firefox|fxios/i.test(userAgent)) {
        browser = "Mozilla Firefox";
    } else if (/safari/i.test(userAgent) && !/chrome|crios|edg/i.test(userAgent)) {
        browser = "Safari";
    } else if (/opr|opera/i.test(userAgent)) {
        browser = "Opera";
    } else if (/msie|trident/i.test(userAgent)) {
        browser = "Internet Explorer";
    } else {
        browser = "Unknown";
    }

    // Detect device type
    let device;
    if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/.test(userAgentLower)) {
        device = "Mobile";
    } else if (/ipad|tablet|android(?!.*mobile)/.test(userAgentLower)) {
        device = "Tablet";
    } else if (isTouch && width <= 1024) {
        // Fallback: could be a tablet or large phone
        device = "Tablet";
    } else {
        device = "Laptop/Desktop";
    }

    // Cache the result
    cachedResult = { browser, device };
    return cachedResult;
}

// Individual export functions
export function getBrowserName() {
    return parseUserAgent().browser;
}

export function getDeviceType() {
    return parseUserAgent().device;
}

// Combined function for when you need both
export function getBrowserInfo() {
    return parseUserAgent();
}

// Utility to clear cache (useful for testing or if user agent changes)
export function clearCache() {
    cachedResult = null;
}

// Usage examples:
// console.log(getBrowserName());    // "Google Chrome"
// console.log(getDeviceType());     // "Laptop/Desktop"
// console.log(getBrowserInfo());    // { browser: "Google Chrome", device: "Laptop/Desktop" }