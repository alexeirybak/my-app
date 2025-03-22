import { useState } from "react";
import useApi from "../hooks/useApi";

const DeleteUser = () => {
  const [userId, setUserId] = useState(null);
  const { loading, error, remove } = useApi(
    "https://677e662d94bde1c1252bc48a.mockapi.io/api/v1/"
  );

  const handleDelete = () => {
    remove(`/users/${userId}`)
      .then(() => {
        alert(`Пользователь с id ${userId} успешно удален`);
        setUserId("");
      })
      .catch((error) => {
        alert("Ошибка удаления пользователя:", error);
      });
  };

  return (
    <div>
      <h2>Удалить пользователя по id</h2>
      <input
        type="text"
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Введите id пользователя"
      />
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Удаление" : " Удалить пользователя"}
      </button>
      {error && <p>Ошибка: {error.message}</p>}
    </div>
  );
};

export default DeleteUser;
