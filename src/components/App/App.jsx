import { useState } from "react";
import Header from "../Header/Header";
import HomePage from "../../pages/HomePage";
import { ThemeToggle } from "../ThemeToggle";
import { Footer } from "../Footer/Footer";
import "./App.css";

function App() {
  const [clicks, setClicks] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [text, setText] = useState("Какой-то текст");
  return (
    <main className="app">
      <Header clicks={clicks} text={text} />
      <HomePage clicks={clicks} setClicks={setClicks} />
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Footer isDarkMode={isDarkMode} text={text} setText={setText} />
    </main>
  );
}

export default App;
