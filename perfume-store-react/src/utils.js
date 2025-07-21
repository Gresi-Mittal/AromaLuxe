// Generate random 4-digit OTP
export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };
  
  // Email validation
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Phone validation
  export const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };
  
  // Cart functions
  export const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  export const addToCart = (product) => {
    let cartItems = getCart();
    const existingItem = cartItems.find(item => item.name === product.name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return cartItems;
  };
  
  export const updateCartItem = (index, quantity) => {
    let cartItems = getCart();
    if (quantity < 1) {
      cartItems.splice(index, 1);
    } else {
      cartItems[index].quantity = quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return cartItems;
  };
  
  export const removeFromCart = (index) => {
    let cartItems = getCart();
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return cartItems;
  };
  
  export const clearCart = () => {
    localStorage.removeItem("cart");
  };
  
  // User functions
  export const getLoggedInUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
  };
  
  export const setLoggedInUser = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
  };