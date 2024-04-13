/* eslint-disable react/prop-types */
import "./Card.css";

export default function Card({ product }) {
  const { image, title, price, quantity } = product;
  return (
    <div className="shopping-card-container">
      <div className="notificacion-bubble-container-cart">
        <img
          className="shopping-card-image"
          src={image}
          alt={title}
        />
        <span className="notification-bubble-cart">{quantity}</span>
      </div>
      <div className="shopping-card-body">
        <p>{title}</p>
        <p>Unit Price: {Number(price)?.toFixed(2)}€</p>
        <p>Total Price: {Number(price)?.toFixed(2) * quantity}€</p>
      </div>
    </div>
  );
}
