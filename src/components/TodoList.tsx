import { useQuery } from "@tanstack/react-query";
import { todosQueryOptions } from "../queries/todos";

export function TodoList() {
  const { data, error, isPending, isFetching, isError, refetch } =
    useQuery(todosQueryOptions());

  if (isPending) {
    return <p>Первая загрузка задач...</p>;
  }

  if (isError) {
    return <p role="alert">Ошибка: {error.message}</p>;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={() => refetch()}>Обновить задачи</button>
        {isFetching && <small>Обновляем в фоне...</small>}
      </div>

      <ul>
        {data.slice(0, 10).map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginLeft: "0.5rem",
              }}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
