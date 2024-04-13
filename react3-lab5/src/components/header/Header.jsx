/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderAccountMenu from "./HeaderAccountMenu";
import { Search } from "react-feather";
import "./Header.css";
import { UserContext } from "../../contextos/UserContext";
import { Link, useSearchParams } from "react-router-dom";

export default function Header() {
  const [formValue, setFormValue] = useState("");
  const { user } = useContext(UserContext);
  const [, setSearchParams] = useSearchParams();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams({ search: formValue });
  }

  return (
    <header
      className={`header-contenedor ${user.isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      <Link to="/">
        <h1 className="header-titulo">MiTienda</h1>
      </Link>
      <HeaderMenu />
      <form onSubmit={handleSubmit}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="search-searc"
          type="text"
          name="search"
          placeholder="Buscar productos"
        />
        <button
          className="header-correct-buton"
          type="submit"
        >
          {" "}
          <Search size={18} />{" "}
        </button>
      </form>
      <HeaderAccountMenu />
    </header>
  );
}

// formValue;
