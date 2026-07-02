import { useSuspenseQuery } from "@tanstack/react-query";
import { todosQueryOptions } from "../queries/todos";

export function TodoCard() {
  const { data } = useSuspenseQuery(todosQueryOptions());

  return (
    <article style={{ border: "1px solid #ddd", padding: "1rem" }}>
      <h3>Первая задача</h3>
      <p>{data[0]?.title || "Нет задач"}</p>
      <small>
        Статус: {data[0]?.completed ? "Выполнено" : "В процессе"}
      </small>
    </article>
  );
}
