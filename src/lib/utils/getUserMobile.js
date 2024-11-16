export default function userMobile() {
    if (typeof window !== "undefined" && window.localStorage) {
      const mobile = localStorage.getItem("mobile");
      return mobile || null; 
    }
    return null; // Return null if not running on the client side
  }
  