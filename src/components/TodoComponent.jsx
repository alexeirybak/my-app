import { useState, useEffect } from "react";

function TodoComponent() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Идет загрузка...</div>;

  return (
    <div>
      <ul>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.title}</p>
              <p>{todo.completed ? "Завершена" : "Не завершена"}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TodoComponent;
