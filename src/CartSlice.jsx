import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure the plant details from the action payload
      const existingItem = state.items.find(item => item.name === name); // Check if the item already exists

      if (existingItem) {
        // If it exists, increase its quantity
        existingItem.quantity++;
      } else {
        // If it doesn't exist, add it to the items array with a quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    
    },
    removeItem: (state, action) => {
       // Remove an item from the cart based on its name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      // Extract the item's name and quantity from the action payload
      const { name, quantity } = action.payload;
      // Find the item in the items array that matches the extracted name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // If the item is found, update its quantity to the new amount provided
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
