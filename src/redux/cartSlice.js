import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Holds cart items
  totalQuantity: 0, // Tracks total items count
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        const itemQuantity = state.cartItems[itemIndex].quantity;
        state.totalQuantity = Math.max(0, state.totalQuantity - itemQuantity); // Prevent negative totalQuantity
        state.cartItems.splice(itemIndex, 1); // Remove item from cart
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1; 
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1; // ✅ Update totalQuantity
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
