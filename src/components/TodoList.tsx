import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

const TodoList = observer(() => {
  if (todoStore.loading) {
    return <p>Загрузка...</p>;
  }

  if (todoStore.error) {
    return (
      <div style={{ color: "red" }}>
        <p>Ошибка: {todoStore.error}</p>
        <button onClick={() => todoStore.loadTodos()}>Попробовать снова</button>
      </div>
    );
  }

  if (todoStore.filteredTodos.length === 0) {
    return <p>Нет задач</p>;
  }
  return (
    <ul>
      {todoStore.filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});

export default TodoList;
