import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  savedItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
const saveCartToLocalStorage = (cartState: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cartState.cart));
  localStorage.setItem("savedItems", JSON.stringify(cartState.savedItems));
  localStorage.setItem("totalQuantity", cartState.totalQuantity.toString());
  localStorage.setItem("totalPrice", cartState.totalPrice.toString());
};

const loadCartFromLocalStorage = (): CartState => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const savedItems: CartItem[] = JSON.parse(
    localStorage.getItem("savedItems") || "[]"
  );
  const totalQuantity: number =
    Number(localStorage.getItem("totalQuantity")) || 0;
  const totalPrice: number = Number(localStorage.getItem("totalPrice")) || 0;

  return { cart, savedItems, totalQuantity, totalPrice };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addItem = { ...action.payload, quantity: 1 };
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        state.cart.push(addItem);
      }
      state.totalPrice += action.payload.price;
      state.totalQuantity += 1;

      saveCartToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cart[itemIndex].quantity += 1;
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      state.totalPrice = Number(state.totalPrice.toFixed(2));

      saveCartToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        if (state.cart[itemIndex].quantity > 1) {
          state.cart[itemIndex].quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= action.payload.price;
          state.totalPrice = Number(state.totalPrice.toFixed(2));
        } else {
          state.totalQuantity -= 1;
          state.totalPrice -= action.payload.price;
          state.totalPrice = Number(state.totalPrice.toFixed(2));
          state.cart.splice(itemIndex, 1);
        }

        saveCartToLocalStorage(state);
      }
    },
    removeFromCart: (state, action) => {
      const removedItem = state.cart.find((item) => item.id === action.payload);
      if (removedItem) {
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.totalPrice = Number(state.totalPrice.toFixed(2));
        state.cart = state.cart.filter((item) => item.id !== action.payload);

        saveCartToLocalStorage(state);
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      saveCartToLocalStorage(state);
    },
    saveForLater: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      const selectedItem = state.cart[itemIndex];

      state.cart.splice(itemIndex, 1); 
      state.savedItems.push(selectedItem); 

      state.totalQuantity -= selectedItem.quantity;
      state.totalPrice -= selectedItem.price * selectedItem.quantity;
      state.totalPrice = Number(state.totalPrice.toFixed(2));

      saveCartToLocalStorage(state);
    },

    moveToCart: (state, action) => {
      const itemIndex = state.savedItems.findIndex(
        (item) => item.id === action.payload
      );
      const selectedItem = state.savedItems[itemIndex];

      state.savedItems.splice(itemIndex, 1); 
      state.cart.push(selectedItem); 

      state.totalQuantity += selectedItem.quantity;
      state.totalPrice += selectedItem.price * selectedItem.quantity;
      state.totalPrice = Number(state.totalPrice.toFixed(2));

      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  resetCart,
  saveForLater,
  moveToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
