import { LOCAL_STORAGE_KEY } from "../constants/todos";
import { PENDING_SYNC_KEY } from "../constants/todos";

export const useTodoActions = ({
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
}) => {
  const addPendingChange = (change) => {
    setPendingSync((prev) => {
      const newChanges = [...prev, change];
      saveToLocalStorage(PENDING_SYNC_KEY, newChanges);
      return newChanges;
    });
  };

  const onAdd = async (text, deadline) => {
    const newTodo = createNewTodo(text, deadline, todos.length + 1);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      try {
        const createdTodo = await createTodo(newTodo);
        const syncedTodos = updatedTodos.map((todo) =>
          todo.id === newTodo.id ? createdTodo : todo
        );
        setTodos(syncedTodos);
        saveToLocalStorage(LOCAL_STORAGE_KEY, syncedTodos);
        return; // Выходим, если успешно синхронизировали
      } catch (error) {
        console.error("Ошибка добавления:", error);
      }
    }
    addPendingChange({
      type: "ADD",
      data: newTodo,
    });
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = updateTodoData(todoToUpdate, newText, newDeadline);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      try {
        await updateTodo(id, updatedTodo);
        return; // Успешное обновление — выходим
      } catch (error) {
        console.error("Ошибка обновления:", error);
      }
    }

    // Сюда попадём только если offline или была ошибка
    addPendingChange({
      type: "UPDATE",
      id,
      data: updatedTodo,
    });
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = toggleTodoCompletion(todoToUpdate);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      try {
        await updateTodo(id, { completed: updatedTodo.completed });
        return; // Успешное обновление — выходим
      } catch (error) {
        console.error("Ошибка обновления:", error);
      }
    }

    // Сюда попадём только если offline или была ошибка
    addPendingChange({
      type: "TOGGLE",
      id,
      data: updatedTodo,
    });
  };

  const handleDelete = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      try {
        await deleteTodo(id);
        return; // Успех — выходим
      } catch (error) {
        console.error("Ошибка удаления:", error);
        // Возвращаем предыдущее состояние (если нужно)
        setTodos(todos);
        saveToLocalStorage(LOCAL_STORAGE_KEY, todos);
      }
    }

    // Сюда попадём только если offline или была ошибка
    addPendingChange({
      type: "DELETE",
      id,
    });
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleDeleteCompleted = () => {
    if (!todos.some((todo) => todo.completed)) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const completedTodos = todos.filter((t) => t.completed);
    const updatedTodos = todos.filter((todo) => !todo.completed);

    // Сразу обновляем локальное состояние
    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      const successfullyDeleted = [];
      const failedToDelete = [];

      // Пытаемся удалить все завершенные задачи
      await Promise.all(
        completedTodos.map(async (todo) => {
          try {
            await deleteTodo(todo.id);
            successfullyDeleted.push(todo.id);
          } catch (error) {
            console.error(`Ошибка удаления задачи ${todo.id}:`, error);
            failedToDelete.push(todo);
          }
        })
      );

      // Восстанавливаем только те задачи, которые не удалось удалить
      if (failedToDelete.length > 0) {
        const restoredTodos = [...updatedTodos, ...failedToDelete];
        setTodos(restoredTodos);
        saveToLocalStorage(LOCAL_STORAGE_KEY, restoredTodos);
      }
    }

    // Добавляем pending-изменения для всех завершенных задач
    // (в оффлайн-режиме или для тех, что не удалились онлайн)
    completedTodos.forEach((todo) => {
      addPendingChange({
        type: "DELETE",
        id: todo.id,
      });
    });

    setIsDeletingCompleted(false);
  };

  const onReorder = async (activeId, overId) => {
    if (!overId) return;

    const activeIndex = todos.findIndex((todo) => todo.id === activeId);
    const overIndex = todos.findIndex((todo) => todo.id === overId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
      return;
    }

    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(activeIndex, 1);
    newTodos.splice(overIndex, 0, movedTodo);

    const updatedTodos = newTodos.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));

    setTodos(updatedTodos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedTodos);

    if (isOnline) {
      try {
        await Promise.all(
          updatedTodos.map((todo) => updateTodo(todo.id, { order: todo.order }))
        );
        return; // Успех — выходим
      } catch (error) {
        console.error("Ошибка изменения порядка:", error);
        // Возвращаем предыдущий порядок
        setTodos(todos);
        saveToLocalStorage(LOCAL_STORAGE_KEY, todos);
      }
    }

    // Сюда попадём только если offline или была ошибка
    updatedTodos.forEach((todo) => {
      addPendingChange({
        type: "UPDATE",
        id: todo.id,
        data: { order: todo.order },
      });
    });
  };

  return {
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    onReorder,
    hasCompletedTodos,
  };
};