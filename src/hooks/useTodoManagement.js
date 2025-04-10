import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useTodoApi } from "./useTodoApi.js";
import { useTodoHelpers } from "./useTodoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";

import { PENDING_SYNC_KEY } from "../constants/todos";
import { LOCAL_STORAGE_KEY } from "../constants/todos";
import { useSyncTodoContext } from "../contexts/SyncTodoContext.jsx";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();
  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodoApi();
  const {isOnline, setPendingSync} = useSyncTodoContext();

  const {
    createNewTodo,
    sortedSavedTodos,
    toggleTodoCompletion,
    updateTodoData,
  } = useTodoHelpers();

  const syncPendingChanges = useCallback(
    async (changes, currentTodos) => {
      // Логика синхронизации
      if (!changes || changes.length === 0) return;
      try {
        let newTodos = [...currentTodos];
        const failedSyncs = [];
        const successfulSyncs = [];
        // Сначала получаем актуальный список с сервера
        let serverTodos = [];

        try {
          serverTodos = await fetchTodos();
        } catch (error) {
          console.error("Не удалось получить задачи с сервера", error);
          setPendingSync(changes);
          return;
        }

        for (const change of changes) {
          try {
            const serverTodoExists = serverTodos.some(
              (t) => t.id === change.id
            );

            switch (change.type) {
              case "ADD": {
                if (!serverTodos.some((t) => t.id === change.data.id)) {
                  const createdTodo = await createTodo(change.data);
                  newTodos = newTodos.map((t) =>
                    t.id === change.data.id ? createdTodo : t
                  );
                  successfulSyncs.push(change);
                } else {
                  successfulSyncs.push(change);
                }
                break;
              }

              case "UPDATE":
              case "TOGGLE": {
                if (serverTodoExists) {
                  await updateTodo(
                    change.id,
                    change.type === "TOGGLE"
                      ? { completed: change.data.completed }
                      : change.data
                  );
                  successfulSyncs.push(change);
                } else {
                  newTodos = newTodos.filter((t) => t.id !== change.id);
                  failedSyncs.push(change);
                }
                break;
              }

              case "DELETE": {
                if (serverTodoExists) {
                  await deleteTodo(change.id);
                }
                newTodos = newTodos.filter((t) => t.id !== change.id);
                successfulSyncs.push(change);
                break;
              }
            }
          } catch (error) {
            console.error("Ошибка синхронизации", error);
            failedSyncs.push(change);
          }
        }

        if (successfulSyncs.length > 0) {
          try {
            const updatedServerTodos = await fetchTodos();
            newTodos = sortedSavedTodos(updatedServerTodos);
          } catch (error) {
            console.error("Не удалось обновить список задач", error);
          }
        }
      } catch (error) {
        console.error("Критическая ошибка синхронизации", error);
      }
    },
    [createTodo, deleteTodo, fetchTodos, updateTodo, sortedSavedTodos]
  );

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = sortedSavedTodos(
        loadFromLocalStorage(LOCAL_STORAGE_KEY)
      );

      // Еще один localStorage с данными
      const savedPendingSync = loadFromLocalStorage(PENDING_SYNC_KEY);

      setTodos(savedTodos);

      if (isOnline) {
        try {
          const serverTodos = await fetchTodos();
          const sortedServerTodos = sortedSavedTodos(serverTodos);
          setTodos(sortedServerTodos);
          saveToLocalStorage(LOCAL_STORAGE_KEY, sortedServerTodos);

          if (savedPendingSync.length > 0) {
            await syncPendingChanges(savedPendingSync, sortedServerTodos);
          }
        } catch (error) {
          console.error("Ошибка загрузки данных:", error);
        }
      } else {
        setPendingSync(savedPendingSync);
      }
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);


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
    isOnline,
    setPendingSync,
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
