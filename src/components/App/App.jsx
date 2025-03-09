import { useState } from "react";
import Header from "../Header/Header";
import HomePage from "../../pages/HomePage";
import { Footer } from "../Footer/Footer";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../global.styled";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const lightTheme = {
    body: "#FFF",
    text: "#363537",
    // Другие стили светлой темы
  };

  const darkTheme = {
    body: "#363537",
    text: "#FAFAFA",
    // Другие стили темной темы
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <main className="app">
        <Header />
        <button onClick={toggleTheme}>Сменить тему</button>
        <HomePage />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
