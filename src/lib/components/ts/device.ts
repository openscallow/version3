export function getBrowserName() {
  const userAgent = navigator.userAgent;
  
  if (/edg/i.test(userAgent)) {
    return "Microsoft Edge";
  } else if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
    return "Google Chrome";
  } else if (/firefox|fxios/i.test(userAgent)) {
    return "Mozilla Firefox";
  } else if (/safari/i.test(userAgent) && !/chrome|crios|edg/i.test(userAgent)) {
    return "Safari";
  } else if (/opr|opera/i.test(userAgent)) {
    return "Opera";
  } else if (/msie|trident/i.test(userAgent)) {
    return "Internet Explorer";
  } else {
    return "Unknown";
  }
}

export function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const width = window.innerWidth;

  if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/.test(ua)) {
    return "Mobile";
  } else if (/ipad|tablet|android(?!.*mobile)/.test(ua)) {
    return "Tablet";
  } else if (isTouch && width <= 1024) {
    // Fallback: could be a tablet or large phone
    return "Tablet";
  } else {
    return "Laptop/Desktop";
  }
}

