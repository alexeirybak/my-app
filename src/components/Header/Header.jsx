import "./Header.css";

function Header() {
  const style = {
    color: "blue",
    fontSize: "2rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <header className="container" style={style}>
      <h1>Заголовок</h1>
    </header>
  );
}

export default Header;
