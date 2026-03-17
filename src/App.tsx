import { useEffect } from "react";
import { todoStore } from "./store/todoStore";
import { observer } from "mobx-react-lite";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

const App = observer(() => {
  const { completedCount, activeCount, progress, todos, loadTodos, setFilter } =
    todoStore;

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>MobX Todo</h1>
      <div>
        <p>Выполнено: {completedCount}</p>
        <p>Активно: {activeCount}</p>
        <p>Всего: {todos.length}</p>
        <p>Прогресс: {progress.toFixed(1)}</p>
      </div>
      <TodoInput />
      <button onClick={loadTodos}>Загрузить задачи</button>
      <div>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("done")}>Выполненные</button>
      </div>
      <TodoList />
    </div>
  );
});

export default App;
