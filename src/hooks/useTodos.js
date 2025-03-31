import { useState, useCallback } from "react";

export function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState("all");

  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }, []);

  const reorderTodos = useCallback((startIndex, endIndex) => {
    setTodos((prev) => {
      const result = [...prev];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    reorderTodos,
    clearCompleted,
    todosCount: todos.length,
    completedCount: todos.filter((t) => t.completed).length,
  };
}
