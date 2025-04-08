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
      if (changes.length === 0) return; // Не синхронизируем если нет изменений
      try {
        let newTodos = [...currentTodos];
        const failedSyncs = [];
        // Обрабатываем только уникальные изменения
        const uniqueChanges = changes.filter(
          (change, index, self) =>
            index ===
            self.findIndex(
              (c) =>
                c.type === change.type &&
                c.id === change.id &&
                c.tempId === change.tempId
            )
        );
        for (const change of uniqueChanges) {
          try {
            switch (change.type) {
              case "ADD": {
                // Проверяем, не была ли уже задача добавлена
                if (!newTodos.some((t) => t.id === change.tempId)) {
                  const createdTodo = await createTodo(change.data);
                  newTodos = newTodos.map((t) =>
                    t.id === change.tempId ? createdTodo : t
                  );
                }
                break;
              }
              case "UPDATE": {
                await updateTodo(change.id, change.data);
                break;
              }
              case "DELETE": {
                await deleteTodo(change.id);
                break;
              }
              case "TOGGLE": {
                await updateTodo(change.id, { completed: change.completed });
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

        // Обновляем состояние только если есть изменения
        if (failedSyncs.length !== changes.length) {
          const serverTodos = await fetchTodos();
          newTodos = sortedSavedTodos(serverTodos);
          setTodos(newTodos);
          saveToLocalStorage(LOCAL_STORAGE_KEY, newTodos);
        }

        setPendingSync(failedSyncs);
        saveToLocalStorage(LOCAL_STORAGE_KEY,newTodos);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
