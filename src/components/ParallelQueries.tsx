import { useQueries } from "@tanstack/react-query";
import { todosQueryOptions } from "../queries/todos";
import { userQueryOptions } from "../queries/users";

export function ParallelQueries() {
  const results = useQueries({
    queries: [todosQueryOptions(), userQueryOptions(1), userQueryOptions(2)],
  });

  const [todosQuery, user1Query, user2Query] = results;

  const allLoaded = todosQuery.data && user1Query.data && user2Query.data;
  const anyLoading = results.some((r) => r.isPending);
  const anyError = results.some((r) => r.isError);

  if (anyLoading) {
    return <p>Загрузка всех данных...</p>;
  }

  if (anyError) {
    return <p role="alert">Ошибка при загрузке данных</p>;
  }

  if (!allLoaded) {
    return <p>Данные не загружены</p>;
  }

  return (
    <div>
      <h3>Параллельные запросы</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <div>
          <h4>Задачи</h4>
          <p>Всего: {todosQuery.data.length}</p>
          <p>Выполнено: {todosQuery.data.filter((t) => t.completed).length}</p>
        </div>
        <div>
          <h4>Пользователь 1</h4>
          <p>{user1Query.data.name}</p>
          <p>{user1Query.data.email}</p>
        </div>
        <div>
          <h4>Пользователь 2</h4>
          <p>{user2Query.data.name}</p>
          <p>{user2Query.data.email}</p>
        </div>
      </div>
    </div>
  );
}
