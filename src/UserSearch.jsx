import { useState, useEffect, useCallback } from "react";

function UserSearch({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Запрос данных пользователя...");
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data = await response.json();
      setUserData(data);
      console.log("Данные пользователя:", data);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div>
      <h2>Данные пользователя</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && (
        <div>
          <p>Имя: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Телефон: {userData.phone}</p>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
