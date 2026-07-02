import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions, userPostsQueryOptions } from "../queries/users";

export function UserProfile() {
  const [userId, setUserId] = useState(1);

  const userQuery = useQuery(userQueryOptions(userId));
  const postsQuery = useQuery(userPostsQueryOptions(userQuery.data?.id));

  if (userQuery.isPending) {
    return <p>Загрузка пользователя...</p>;
  }

  if (userQuery.isError) {
    return (
      <p role="alert">
        Ошибка загрузки пользователя: {userQuery.error.message}
      </p>
    );
  }

  const user = userQuery.data;

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setUserId((id) => Math.max(1, id - 1))}>
          Предыдущий пользователь
        </button>
        <button onClick={() => setUserId((id) => id + 1)}>
          Следующий пользователь
        </button>
        <button onClick={() => userQuery.refetch()}>
          Обновить пользователя
        </button>
        {userQuery.isFetching && <small>Обновляем пользователя...</small>}
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
      </div>

      <div>
        <h3>Посты пользователя</h3>
        {postsQuery.isPending && <p>Загрузка постов...</p>}
        {postsQuery.isError && (
          <p style={{ color: "red" }}>
            Ошибка загрузки постов: {postsQuery.error.message}
          </p>
        )}
        {postsQuery.isFetching && !postsQuery.isPending && (
          <small>Обновляем посты...</small>
        )}
        {postsQuery.data && (
          <ul>
            {postsQuery.data.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
