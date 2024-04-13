/* eslint-disable react/prop-types */
import { ShoppingCart, Heart, User, Moon, Sun } from "react-feather";
import "./HeaderAccountMenu.css";
import { useContext } from "react";
import { UserContext } from "../../contextos/UserContext";
import { Link } from "react-router-dom";

export default function HeaderAccountMenu() {
  const { user, setUser } = useContext(UserContext);

  function handleTheme() {
    setUser({ ...user, isDarkMode: !user.isDarkMode });
  }

  return (
    <ul className="count-ul">
      <li>
        <Link to="/login">
          {
            <User
              style={{ strokeWidth: 2 }}
              size={20}
              color={
                user.isLogged
                  ? user.isDarkMode
                    ? "greenyellow"
                    : "green"
                  : user.isDarkMode
                    ? "white"
                    : "black"
              }
            />
          }
        </Link>
      </li>
      <li>
        <Heart size={20} />
      </li>
      <li onClick={handleTheme}>
        {user.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </li>
      <li className="notificacion-bubble-container">
        <Link to="/cart">
          <ShoppingCart size={20} />
        </Link>

        {user.shoppingCartItems.length !== 0 && (
          <span className="notification-bubble">
            {user.shoppingCartItems.length}
          </span>
        )}
      </li>
    </ul>
  );
}
