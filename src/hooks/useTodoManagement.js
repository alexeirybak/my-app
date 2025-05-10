import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useTodoApi } from "./useTodoApi.js";
import { useTodoHelpers } from "./useTodoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();
  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodoApi();
  const {
    createNewTodo,
    sortedSavedTodos,
    toggleTodoCompletion,
    updateTodoData,
  } = useTodoHelpers();

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSavedTodos(loadFromLocalStorage());

      setTodos(savedTodos);

      try {
        const serverTodos = await fetchTodos();
        const sortedServerTodos = sortedSavedTodos(serverTodos);
        setTodos(sortedServerTodos);
        saveToLocalStorage(sortedServerTodos);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadInitialData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actions = useTodoActions({
    todos,
    setTodos,
    createNewTodo,
    createTodo,
    saveToLocalStorage,
    updateTodo,
    updateTodoData,
    toggleTodoCompletion,
    deleteTodo,
    setIsDeletingCompleted,
  });

  return {
    todos,
    setTodos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    ...actions,
  };
};
