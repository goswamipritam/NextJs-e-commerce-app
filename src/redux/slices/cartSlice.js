// import { createSlice } from '@reduxjs/toolkit';

// // Load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   try {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : { items: [], totalAmount: 0, totalQuantity: 0 };
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     return { items: [], totalAmount: 0, totalQuantity: 0 };
//   }
// };

// // Save cart to localStorage
// const saveCartToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// const initialState = loadCartFromLocalStorage();

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
//       }
//       state.totalQuantity++;
//       state.totalAmount += action.payload.price;
//       saveCartToLocalStorage(state); // Save updated state to localStorage
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       const item = state.items[itemIndex];
//       state.totalAmount -= item.price * item.quantity;
//       state.totalQuantity -= item.quantity;
//       state.items.splice(itemIndex, 1);
//       saveCartToLocalStorage(state); // Save updated state to localStorage
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       saveCartToLocalStorage(state); // Save updated state to localStorage
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   items: [],
//   totalAmount: 0,
//   totalQuantity: 0,
// };

// // Save cart to localStorage
// const saveCartToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
//       }
//       state.totalQuantity++;
//       state.totalAmount += action.payload.price;
//       if (typeof window !== 'undefined') saveCartToLocalStorage(state); // Save only in the browser
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       const item = state.items[itemIndex];
//       state.totalAmount -= item.price * item.quantity;
//       state.totalQuantity -= item.quantity;
//       state.items.splice(itemIndex, 1);
//       if (typeof window !== 'undefined') saveCartToLocalStorage(state); // Save only in the browser
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       if (typeof window !== 'undefined') saveCartToLocalStorage(state); // Save only in the browser
//     },
//     hydrateCart(state) {
//       try {
//         if (typeof window !== 'undefined') {
//           const cart = localStorage.getItem('cart');
//           if (cart) {
//             return JSON.parse(cart);
//           }
//         }
//       } catch (error) {
//         console.error('Error hydrating cart from localStorage:', error);
//       }
//       return state;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const loadCartFromLocalStorage = () => {
//   try {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : { items: [], totalAmount: 0, totalQuantity: 0 };
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     return { items: [], totalAmount: 0, totalQuantity: 0 };
//   }
// };

// // Initialize state from localStorage
// const initialState = loadCartFromLocalStorage();

// // Save cart to localStorage
// const saveCartToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
//       }
//       state.totalQuantity++;
//       state.totalAmount += action.payload.price;
//       saveCartToLocalStorage(state);
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       if (itemIndex !== -1) {
//         const item = state.items[itemIndex];
//         state.totalAmount -= item.totalPrice;
//         state.totalQuantity -= item.quantity;
//         state.items.splice(itemIndex, 1);
//         saveCartToLocalStorage(state);
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       saveCartToLocalStorage(state);
//     },
//     hydrateCart(state) {
//       const persistedState = loadCartFromLocalStorage();
//       state.items = persistedState.items;
//       state.totalAmount = persistedState.totalAmount;
//       state.totalQuantity = persistedState.totalQuantity;
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const loadCartFromLocalStorage = () => {
//   try {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : { items: [], totalAmount: 0, totalQuantity: 0 };
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     return { items: [], totalAmount: 0, totalQuantity: 0 };
//   }
// };

// // Initialize state
// const initialState = { items: [], totalAmount: 0, totalQuantity: 0 };

// // Save cart to localStorage
// const saveCartToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
//       }
//       state.totalQuantity++;
//       state.totalAmount += action.payload.price;
//       saveCartToLocalStorage(state);
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       if (itemIndex !== -1) {
//         const item = state.items[itemIndex];
//         state.totalAmount -= item.totalPrice;
//         state.totalQuantity -= item.quantity;
//         state.items.splice(itemIndex, 1);
//         saveCartToLocalStorage(state);
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       saveCartToLocalStorage(state);
//     },
//     hydrateCart(state, action) {
//       return action.payload; // Replace state with hydrated data
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
// export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// // Load cart from localStorage
// const loadCartFromLocalStorage = () => {
//   try {
//     const cart = localStorage.getItem('cart');
//     return cart ? JSON.parse(cart) : { items: [], totalAmount: 0, totalQuantity: 0 };
//   } catch (error) {
//     console.error('Error loading cart from localStorage:', error);
//     return { items: [], totalAmount: 0, totalQuantity: 0 };
//   }
// };

// // Save cart to localStorage
// const saveCartToLocalStorage = (state) => {
//   try {
//     localStorage.setItem('cart', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving cart to localStorage:', error);
//   }
// };

// // Initial state
// const initialState = { items: [], totalAmount: 0, totalQuantity: 0 };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action) {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice += action.payload.price;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
//       }
//       state.totalQuantity++;
//       state.totalAmount += action.payload.price;
//       saveCartToLocalStorage(state);
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       if (itemIndex !== -1) {
//         const item = state.items[itemIndex];
//         state.totalAmount -= item.totalPrice;
//         state.totalQuantity -= item.quantity;
//         state.items.splice(itemIndex, 1);
//         saveCartToLocalStorage(state);
//       }
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalAmount = 0;
//       state.totalQuantity = 0;
//       saveCartToLocalStorage(state);
//     },
//     hydrateCart(state, action) {
//       return action.payload; // Replace state with hydrated data
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Initial state
const initialState = { items: [], totalAmount: 0, totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1, totalPrice: action.payload.price });
      }
      state.totalQuantity++;
      state.totalAmount += action.payload.price;
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action) {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalAmount -= item.totalPrice;
        state.totalQuantity -= item.quantity;
        state.items.splice(itemIndex, 1);
        saveCartToLocalStorage(state);
      }
    },
    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalAmount += item.price;
        saveCartToLocalStorage(state);
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalAmount -= item.price;
        saveCartToLocalStorage(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      saveCartToLocalStorage(state);
    },
    hydrateCart(state, action) {
      return action.payload || state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
