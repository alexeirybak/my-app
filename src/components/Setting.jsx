import { useLocalStorage } from "../hooks/useLocalStorage";

function Setting() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const [language, setLanguage] = useLocalStorage("language", "ru");

  return (
    <div>
      <h1>Настроки</h1>
      <div>
        <h2>Тема:</h2>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
        </select>
      </div>
      <div>
        <h2>Язык:</h2>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
      </div>

      <p>Текущая тема: {theme}</p>
      <p>Текущий язык: {language}</p>
    </div>
  );
}

export default Setting;
