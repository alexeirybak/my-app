import Setting from "./components/Setting";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [name, handleSetName, handleRemoveName] = useLocalStorage(
    "name",
    "Гость"
  );

  return (
    <div>
      <h1>Привет, {name}!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => handleSetName(e.target.value)}
        placeholder="Введите ваше имя"
      />
      <button onClick={handleRemoveName}>Очистить имя</button>
      <Setting />
    </div>
  );
};

export default App;
