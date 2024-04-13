import "./HeaderMenu.css";

export default function HeaderMenu() {
  const menuData = [
    { id: 1, title: "Inicio" },
    { id: 2, title: "Categoria" },
    { id: 3, title: "Ofertas" },
    { id: 4, title: "Contacto" },
  ];

  return (
    <nav>
      <ul className="navigator">
        {menuData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </nav>
  );
}
