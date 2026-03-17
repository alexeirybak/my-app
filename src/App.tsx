import { useEffect } from "react";
import { todoStore } from "./store/todoStore";
import { observer } from "mobx-react-lite";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";

const App = observer(() => {
  useEffect(() => {
    todoStore.loadTodos();
  }, []);

  return (
    <div>
      <h1>MobX Todo</h1>
      <div>
        <p>Выполнено: {todoStore.completedCount}</p>
        <p>Активно: {todoStore.activeCount}</p>
        <p>Всего: {todoStore.todos.length}</p>
        <p>Прогресс: {todoStore.progress.toFixed(1)}</p>
      </div>
      <TodoInput />
      <button onClick={todoStore.loadTodos}>Загрузить задачи</button>
      <div>
        <button onClick={() => todoStore.setFilter("all")}>Все</button>
        <button onClick={() => todoStore.setFilter("active")}>Активные</button>
        <button onClick={() => todoStore.setFilter("done")}>Выполненные</button>
      </div>
      <TodoList />
    </div>
  );
});

export default App;
