import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import { cartActions } from "../../store/cart-slice";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const { title, price, description, id } = props;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice();
    const existingItem = updatedItems.find((item) => item.id === id);

    if (existingItem) {
      const updatedItem = { ...existingItem };
      updatedItem.quantity++;
      updatedItems.price = updatedItem.price + price;
      const existingItemIndex = updatedItem.findIndex((item) => item.id === id);
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    };

    dispatch(cartActions.replaceCart(newCart));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
