import { uiActions } from "./ui-slice";
import { CART_DATA_STATUS } from "../constants/cartData";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_DB_URL}/cart.json`,
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      return await response.json();
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        }),
      );
    } catch (e) {
      dispatch(uiActions.showNotification(CART_DATA_STATUS.ERROR_FETCH));
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification(CART_DATA_STATUS.PENDING));
    const sendRequest = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE_DB_URL}/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
      dispatch(uiActions.showNotification(CART_DATA_STATUS.ERROR_SEND));
    }
  };
};
