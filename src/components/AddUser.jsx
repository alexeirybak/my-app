import { useState } from "react";
import useApi from "../hooks/useApi";

const AddUser = () => {
  const [name, setName] = useState("");
  const [hasCar, setHasCar] = useState(false);

  const { loading, error, post } = useApi(
    "https://677e662d94bde1c1252bc48a.mockapi.io/api/v1/"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name,
      hasCar,
    };

    post("users", body)
      .then(() => {
        alert("Пользователь добавлен");
        setName("");
        setHasCar(false);
      })
      .catch(() => {
        alert("Не удалось добавить пользователя. Попробуйте позже");
      });
  };

  return (
    <div>
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            required
          />
        </div>
        <div>
          <label htmlFor="hasCar">Наличие машины:</label>
          <input
            type="checkbox"
            id="hasCar"
            checked={hasCar}
            onChange={(e) => setHasCar(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Идет загрузка" : "Добавить пользователя"}
        </button>
      </form>
      {error && <p>Ошибка: {error.message}</p>}
    </div>
  );
};

export default AddUser;
