import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { useTodoApi } from "./useTodoApi.js";
import { useTodoHelpers } from "./useTodoHelpers.js";
import { useTodoActions } from "./useTodoActions.js";

import { PENDING_SYNC_KEY } from "../constants/todos";
import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState([]);
  const { loadFromLocalStorage, saveToLocalStorage } = useLocalStorage();
  const { fetchTodos, createTodo, updateTodo, deleteTodo } = useTodoApi();

  const {
    createNewTodo,
    sortedSavedTodos,
    toggleTodoCompletion,
    updateTodoData,
  } = useTodoHelpers();

  const syncPendingChanges = useCallback(
    async (changes, currentTodos) => {
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
          // Если не удалось получить задачи, помечаем все изменения как неудачные
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
                // Для добавления проверяем, нет ли уже такой задачи на сервере
                if (!serverTodos.some((t) => t.id === change.data.id)) {
                  const createdTodo = await createTodo(change.data);
                  newTodos = newTodos.map((t) =>
                    t.id === change.data.id ? createdTodo : t
                  );
                  successfulSyncs.push(change);
                } else {
                  // Если задача уже есть на сервере, считаем синхронизацию успешной
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
                      ? { completed: change.completed }
                      : change.data
                  );
                  successfulSyncs.push(change);
                } else {
                  // Если задачи нет на сервере, удаляем её из локального хранилища
                  newTodos = newTodos.filter((t) => t.id !== change.id);
                  failedSyncs.push(change);
                }
                break;
              }
              case "DELETE": {
                if (serverTodoExists) {
                  await deleteTodo(change.id);
                }
                // Удаляем задачу в любом случае, даже если её нет на сервере
                newTodos = newTodos.filter((t) => t.id !== change.id);
                successfulSyncs.push(change);
                break;
              }
              default:
                break;
            }
          } catch (error) {
            console.error("Ошибка синхронизации:", error);
            failedSyncs.push(change);
          }
        }

        // Обновляем локальное состояние
        if (successfulSyncs.length > 0) {
          try {
            const updatedServerTodos = await fetchTodos();
            newTodos = sortedSavedTodos(updatedServerTodos);
          } catch (error) {
            console.error("Не удалось обновить список задач", error);
          }
        }

        setTodos(newTodos);
        setPendingSync(failedSyncs);
        saveToLocalStorage(LOCAL_STORAGE_KEY, newTodos);
        saveToLocalStorage(PENDING_SYNC_KEY, failedSyncs);
      } catch (error) {
        console.error("Критическая ошибка синхронизации", error);
      }
    },
    [
      saveToLocalStorage,
      createTodo,
      updateTodo,
      deleteTodo,
      fetchTodos,
      sortedSavedTodos,
    ]
  );

  useEffect(() => {
    const loadInitialData = async () => {
      // Загружаем из localStorage
      const savedTodos = sortedSavedTodos(
        loadFromLocalStorage(LOCAL_STORAGE_KEY)
      );
      const savedPendingSync = loadFromLocalStorage(PENDING_SYNC_KEY);

      setTodos(savedTodos);

      // Если online, загружаем с сервера
      if (isOnline) {
        try {
          const serverTodos = await fetchTodos();
          const sortedServerTodos = sortedSavedTodos(serverTodos);
          setTodos(sortedServerTodos);
          saveToLocalStorage(LOCAL_STORAGE_KEY, sortedServerTodos);

          // Синхронизируем только если есть ожидающие изменения
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
  }, [isOnline]); // Не забываем ставить зависимость

  //Слушатель изменения состояния сети
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [pendingSync, syncPendingChanges, todos]);

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
