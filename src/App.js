import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";
import { CART_DATA_STATUS } from "./constants/cartData";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const sendCartData = async () => {
      dispatch(uiActions.showNotification(CART_DATA_STATUS.PENDING));
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

      dispatch(uiActions.showNotification(CART_DATA_STATUS.SUCCESS));
    };

    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification(CART_DATA_STATUS.ERROR));
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
