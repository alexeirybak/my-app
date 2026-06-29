import { useState, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoMachine";

function App() {
  const [state, send] = useMachine(todosMachine);
  const { todos, uiError, maxTodos } = state.context;
  const [inputValue, setInputValue] = useState("");

  // Автоматически очищаем ошибку через 3 секунды
  useEffect(() => {
    if (uiError) {
      const timer = setTimeout(() => {
        send({ type: "CLEAR_UI_ERROR" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uiError, send]);

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
    };

    send({ type: "ADD", todo: newTodo });
    setInputValue("");
  };

  const handleDeleteTodo = (id: number) => {
    send({ type: "DELETE", id });
  };

  // Рендер состояний
  if (state.matches("idle")) {
    return (
      <div>
        <h1>TODO Приложение на XState</h1>
        <button onClick={() => send({ type: "FETCH" })}>
          Загрузить тудушки
        </button>
      </div>
    );
  }

  if (state.matches("loading")) {
    return (
      <div>
        <h1>Загрузка...</h1>
        <div>Пожалуйста, подождите</div>
      </div>
    );
  }

  if (state.matches("error")) {
    return (
      <div>
        <h1>Ошибка</h1>
        <p>{state.context.error || "Произошла неизвестная ошибка"}</p>
        <button onClick={() => send({ type: "RETRY" })}>
          Попробовать снова
        </button>
      </div>
    );
  }

  // Состояние 'ready'
  return (
    <div>
      <h1>Мои задачи</h1>

      {/* Статистика */}
      <div>
        {todos.length} из {maxTodos} задач
      </div>

      {/* UI ошибка */}
      {uiError && (
        <div>
          <span>{uiError}</span>
          <button onClick={() => send({ type: "CLEAR_UI_ERROR" })}>✕</button>
        </div>
      )}

      {/* Поле ввода и кнопка добавления */}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            todos.length >= maxTodos
              ? `Лимит достигнут (${maxTodos})`
              : "Добавить новую задачу..."
          }
          disabled={todos.length >= maxTodos}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              handleAddTodo();
            }
          }}
        />
        <button
          onClick={handleAddTodo}
          disabled={!inputValue.trim() || todos.length >= maxTodos}
        >
          Добавить
        </button>

        {todos.length >= maxTodos && <div>Достигнут лимит задач</div>}
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>Нет задач. Добавьте новую!</p>}
    </div>
  );
}

export default App;
