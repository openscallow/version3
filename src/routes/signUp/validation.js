export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8 || password.length > 20) {
      return "Password must be between 8 and 20 characters";
    }
    return "";
  };
  
  export const validateMobileNumber = (number) => {
    if (!number) return "";
    if (number.length !== 10 || !/^\d+$/.test(number)) {
      return "Mobile number must contain 10 digits";
    }
    return "";
  };
  
  export const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };