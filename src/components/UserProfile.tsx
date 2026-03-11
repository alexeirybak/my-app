import { useUser, useUserName, useUserLevel } from "../store/useUserStore";

export const UserProfile = () => {
  const user = useUser();
  const name = useUserName();
  const level = useUserLevel();
  if (!user) return <div className="container">Пользователь не найден</div>;
  return (
    <div className="container">
      <div className="user-profile">
        <div className="user-avatar">{name.charAt(0)}</div>
        <div className="user-info">
          <h2>{name}</h2>
          <p>Email: {user.email}</p>
          <p>Возраст: {user.age}</p>
          <p>Уровень: {level}</p>
        </div>
      </div>
    </div>
  );
};
