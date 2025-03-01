import "./Header.css";

function Header({ clicks, text }) {
  const style = {
    color: "blue",
    fontSize: "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <header className="container" style={style}>
      <h1>Заголовок</h1>

      <p>{clicks}</p>
      <p>{text}</p>
    </header>
  );
}

export default Header;
