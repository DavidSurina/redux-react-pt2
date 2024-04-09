import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";
import { CART_DATA_STATUS } from "../constants/cartData";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification(CART_DATA_STATUS.PENDING));
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_DB_URL}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.showNotification(CART_DATA_STATUS.SUCCESS));
    } catch (e) {
      dispatch(uiActions.showNotification(CART_DATA_STATUS.ERROR));
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice;
