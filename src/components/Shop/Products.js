import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

export const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "First book",
    description: "First special book",
  },
  {
    id: "p2",
    price: 5,
    title: "Second book",
    description: "Second special book",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
