import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../contextos/UserContext";
import { useContext } from "react";
import { getAllProducts } from "../../redux/reducers/itemsReducer";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const products = useSelector(getAllProducts);

  const handleAddToCart = () => {
    setUser({
      ...user,
      shoppingCartItems: [...user.shoppingCartItems, findProduct.id],
    });
  };

  const findProduct = products.find(
    (product) => product.id.toString() === id.toString()
  );
  const { title, price, description, image, category } = findProduct;

  return (
    <main className="product-container-example">
      <img
        src={image}
        alt={title}
      />
      <div className="product-detail-description-example">
        <Link to="/">Back to Products</Link>
        <h2>{title}</h2>
        <p className="product-detail-price-example">Price: {price}€</p>
        <p>{description}</p>
        <p>Category: {category}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </main>
  );
}
