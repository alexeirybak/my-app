import "./Footer.css";

export function Footer({ isDarkMode, setText, text }) {
  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <footer
      className="footer"
      style={{
        background: isDarkMode ? "red" : "blue",
        color: isDarkMode ? "white" : "black",
        height: 200,
      }}
    >
      <p>Подвал сайта</p>
      <input type="text" value={text} onChange={handleChange} />
    </footer>
  );
}
