/* eslint-disable react/prop-types */
import "./ProductCard.css";
import { useContext } from "react";
import { UserContext } from "../../contextos/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";
import { removeProductThunk } from "../../redux/reducers/itemsReducer.js";
import { useDispatch } from "react-redux";

export default function ProductCard({
  product,
  openEditProductModal,
  setModalType,
}) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setUser({
      ...user,
      shoppingCartItems: [...user.shoppingCartItems, product.id],
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  function handleEditItem(e) {
    e.stopPropagation();
    openEditProductModal(product.id);
    setModalType("edit");
  }
  function handleDeleteProduct(e) {
    e.stopPropagation();
    dispatch(removeProductThunk(product.id));
  }

  return (
    <div
      onClick={handleCardClick}
      className="product-card-container"
    >
      <img
        className="card-img"
        src={product.image}
        alt={product.title}
      />
      <div className="card-items">
        <h3 className="card-titles">{product.title}</h3>
        <p className="card-descs">{product.description}</p>
        <p className="card-prices">{product.price}€</p>
      </div>
      {user.isLogged && (
        <button
          onClick={handleAddToCart}
          className="card-buton"
        >
          Add to Cart
        </button>
      )}
      {user.isLogged && user.role === "admin" && (
        <div className="edit-delete-btn">
          <button onClick={handleEditItem}>
            <Edit2 />
          </button>
          <button onClick={handleDeleteProduct}>
            <Trash2 color={"red"} />
          </button>
        </div>
      )}
    </div>
  );
}
