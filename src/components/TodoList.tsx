import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

const TodoList = observer(() => {
  const { filteredTodos, loadTodos, loading, error } = todoStore;

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>Ошибка: {error}</p>
        <button onClick={() => loadTodos()}>Попробовать снова</button>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return <p>Нет задач</p>;
  }
  return (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});

export default TodoList;
