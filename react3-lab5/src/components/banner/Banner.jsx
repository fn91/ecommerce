import "./Banner.css";
import { UserContext } from "../../contextos/UserContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

export default function Promotion() {
  const { user } = useContext(UserContext);
  const locationPath = useLocation();
  const rutas = locationPath.pathname.split("/")[1];

  const banner = () => {
    if (user.isLogged && rutas === "") {
      return <p>{user.name}, use your 30% of discount on checkout!</p>;
    } else if (!user.isLogged && rutas === "login") {
      return <p>Login to get extra discounts!</p>;
    } else if (user.isLogged && rutas === "cart") {
      return (
        <p>{user.name}, your 30% of discount will  aplied!</p>
      );
    } else {
      return <p>30% de descuento para  nuevos usuarios</p>;
    }
  };

  return <div className="banner">{banner()}</div>;
}
