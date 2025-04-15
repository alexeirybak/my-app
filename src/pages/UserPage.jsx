import { useState } from "react";
import { useParams, useNavigate } from "react-router";

// Массив пользователей
const users = [
  { id: 1, name: "Иван Иванов", bio: "Люблю программирование и кофе" },
  { id: 2, name: "Мария Петрова", bio: "Фотограф и путешественник" },
  { id: 3, name: "Алексей Смирнов", bio: "Музыкант и преподаватель" },
];

const defaultUser = {
  name: "Неизвестный пользователь",
  bio: "Информация отсутствует",
};

export const UserPage = () => {
  const { userId } = useParams();
  const [inputId, setInputId] = useState("");
  const navigate = useNavigate();

  const user = users.find((user) => user.id === Number(userId)) || defaultUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${inputId}`)
  };

  return (
    <>
      <div>
        <h1>Страница пользователя</h1>
        <h2>ID пользователя: {userId}</h2>
        <h3>Имя: {user.name}</h3>
        <p>О себе: {user.bio}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Введите ID пользователя"
          min="1"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <button type="submit">Найти</button>
      </form>
    </>
  );
};
