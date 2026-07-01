import { useMachine } from "@xstate/react";
import { todosMachine } from "./machines/todoMachine";
import { useState } from "react";

function App() {
  const [state, send] = useMachine(todosMachine);
  const { todos, error, maxTodos, uiError } = state.context;
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: inputValue,
    };

    send({ type: "ADD", todo: newTodo });
    setInputValue("");
  };

  return (
    <div>
      <h1>TODO List</h1>

      <div>
        Задач: {todos.length} из {maxTodos}
      </div>
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      {uiError && (
        <div>
          <p style={{ color: "red" }}>{uiError}</p>
          <button onClick={() => send({ type: "CLEAR_UI_ERROR" })}>
            Очистить ошибку
          </button>
        </div>
      )}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите задачу"
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => send({ type: "DELETE", id: todo.id })}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => send({ type: "FETCH" })}>Загрузить</button>
        <button onClick={() => send({ type: "RETRY" })}>Повторить</button>
      </div>
    </div>
  );
}
export default App;
