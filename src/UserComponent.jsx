import { useState } from "react";
import UserGreeting from "./UserGreeting";

const UserComponent = () => {
  const [name, setName] = useState("Иван"); // Начальное значение имени
  const [inputValue, setInputValue] = useState(""); // Состояние для input

  const handleChange = (e) => {
    setInputValue(e.target.value); // Обновляем значение input
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (inputValue.trim() === "") {
      return; // Прерываем выполнение функции
    }

    setName(inputValue); // Обновляем имя
    setInputValue(""); // Очищаем input
  };

  return (
    <div>
      <h1>Пример с useRef</h1>
      <UserGreeting name={name} /> {/* Передаем имя в UserGreeting */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите новое имя"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Изменить имя</button>
      </form>
    </div>
  );
};

export default UserComponent;
