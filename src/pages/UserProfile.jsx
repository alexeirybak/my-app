export function UserProfile({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <h1>Профиль пользователя</h1>
          <p>Имя: {user.name}</p>
          {user.age > 18 && <p>Возраст: {user.age}</p>}
        </div>
      ) : (
        <h1>Пользователь не найден</h1>
      )}
    </div>
  );
}
