import { UserContext } from "../../contextos/UserContext";
import { useContext } from "react";
import "./Footer.css";

export default function Footer() {
  const { user } = useContext(UserContext);

  return (
    <footer
      className={`footer-container ${user.isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="footer-details">
        <ul>
          <li>Contacto</li>
          <li>Email: correoelectronico@hotmail.com</li>
          <li>Telefono: +45 323 656 454</li>
        </ul>
        <ul>
          <li>Redes Sociales</li>
          <li>Tiktok</li>
          <li>Facebook</li>
          <li>Telegram</li>
        </ul>
        <ul>
          <li>Direccion</li>
          <li>Calle </li>
          <li>Codigo Postal</li>
        </ul>
      </div>
      <p>© Derechos de autor producido Entertaiment</p>
    </footer>
  );
}
