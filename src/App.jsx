import { useEffect, useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import ToggleTheme from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";

const API_URL = "https://67ebfba5aa794fb3222c629a.mockapi.io/api/v1/todos";
const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log(isOnline);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || []
      );
      setTodos(savedTodos);
    };

    loadInitialData();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  }, [isOnline]);

  const onAdd = async (text, deadline) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };

    const updateTodos = [...todos, newTodo];
    setTodos(updateTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();

      const syncedTodos = updateTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo
      );
      setTodos(syncedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos));
    } catch (error) {
      console.log("Ошибка добавления:", error);
    }
  };

  const onDelete = async (id) => {
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
    } catch (error) {
      console.error("Ошибка обновления статуса задачи:", error);
    }
  };

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
      {!isOnline && (
        <div>
          Вы в оффлайн-режиме. Изменения будут синхронизированы при подключении
        </div>
      )}
      <div className="mx-auto flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Todo App
          </span>
        </h1>
        <AddTodo onAdd={onAdd} />
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleComplete={toggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
