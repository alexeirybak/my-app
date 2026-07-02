import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { commentsQueryOptions } from "../queries/comments";

export function CommentsList() {
  const [postId, setPostId] = useState(1);
  const { data, isPending, isError, error, refetch, isFetching } = useQuery(
    commentsQueryOptions(postId),
  );

  if (isPending) {
    return <p>Загрузка комментариев...</p>;
  }

  if (isError) {
    return <p role="alert">Ошибка: {error.message}</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={() => setPostId((id) => id + 1)}>
          Следующий пост (ID: {postId})
        </button>
        <button onClick={() => refetch()}>Обновить комментарии</button>
        {isFetching && <small>Обновляем...</small>}
      </div>

      <div>
        <h3>Комментарии для поста #{postId}</h3>
        <ul>
          {data.slice(0, 5).map((comment) => (
            <li key={comment.id}>
              <strong>{comment.name}</strong> ({comment.email})
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
