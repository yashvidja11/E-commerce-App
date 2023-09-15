import { createSlice } from "@reduxjs/toolkit";

interface WishlistItem {
  id: number;
  image: string;
  title: string;
  price: number;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

const loadWishlistFromLocalStorage = (): WishlistItem[] => {
  const storedWishlist = localStorage.getItem("wishlist");
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const saveWishlistToLocalStorage = (wishlist: WishlistItem[]): void => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const wishListSlice = createSlice({
  name: "WishList",
  initialState: {
    wishlist: loadWishlistFromLocalStorage(),
  } as WishlistState,
  reducers: {
    addToWishList: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex = state.wishlist.findIndex(
        (item) => item?.id === newItem?.id
      );

      if (existingItemIndex !== -1) {
        state.wishlist.splice(existingItemIndex, 1);
      } else {
        state.wishlist.push(newItem);
      }

      saveWishlistToLocalStorage(state.wishlist);
    },
  },
});

export const { addToWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
