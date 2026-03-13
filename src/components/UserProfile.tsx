import {
  useUser,
  useUserName,
  useUserLevel,
  useGameOver,
  useUserActions,
  useError,
  useIsLoading,
} from "../store/useUserStoreThird";

export const UserProfile = () => {
  const user = useUser();
  const name = useUserName();
  const level = useUserLevel();
  const gameOver = useGameOver();
  const error = useError();
  const isLoading = useIsLoading();
  const { restartGame, fetchRandomUser, clearError } = useUserActions();

  if (!user) return <div className="container">Пользователь не найден</div>;

  if (isLoading) {
    return (
      <div className="container">
        <p>Загрузка данных пользователя...</p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="container">Ошибка получения пользователя</div>
        <p>{error}</p>
        <button onClick={clearError}>Очистить ошибку</button>
        <button onClick={fetchRandomUser}>Попробовать снова</button>
      </>
    );
  }

  if (gameOver) {
    return (
      <div className="container">
        <div className="game-over">
          <h1>ИГРА ОКОНЧЕНА!</h1>
          <p>Достигнут 1000 опыта!</p>
          <p>Финальный уровень: {level}</p>
          <p>Финальный опыт: {user.experience}</p>
          <button
            onClick={restartGame}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Перезапустить игру
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="user-profile">
        <div className="user-avatar">{name.charAt(0)}</div>
        <div className="user-info">
          <h2>{name}</h2>
          <p>Email: {user.email}</p>
          <p>Возраст: {user.age}</p>
          <p>Уровень: {level}</p>
          <p>Опыт: {user.experience} XP</p>
          <button onClick={fetchRandomUser}>
            Загрузить другого пользователя
          </button>
        </div>
      </div>
    </div>
  );
};
