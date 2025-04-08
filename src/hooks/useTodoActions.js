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
      localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(newChanges));
      return newChanges;
    });
  };

  const onAdd = async (text, deadline) => {
    const newTodo = createNewTodo(text, deadline, todos.length + 1);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      try {
        const createdTodo = await createTodo(newTodo);
        const syncedTodos = updatedTodos.map((todo) =>
          todo.id === newTodo.id ? createdTodo : todo
        );
        setTodos(syncedTodos);
        saveToLocalStorage(syncedTodos);
      } catch (error) {
        console.error("Ошибка добавления:", error);
        addPendingChange({
          type: "ADD",
          data: newTodo,
          tempId: newTodo.id,
        });
      }
    } else {
      addPendingChange({
        type: "ADD",
        data: newTodo,
        tempId: newTodo.id,
      });
    }
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = updateTodoData(todoToUpdate, newText, newDeadline);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      try {
        await updateTodo(id, updatedTodo);
      } catch (error) {
        console.error("Ошибка обновления:", error);
        addPendingChange({
          type: "UPDATE",
          id,
          data: updatedTodo,
        });
      }
    } else {
      addPendingChange({
        type: "UPDATE",
        id,
        data: updatedTodo,
      });
    }
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = toggleTodoCompletion(todoToUpdate);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      try {
        await updateTodo(id, { completed: updatedTodo.completed });
      } catch (error) {
        console.error("Ошибка обновления:", error);
        addPendingChange({
          type: "TOGGLE",
          id,
          completed: updatedTodo.completed,
        });
      }
    } else {
      addPendingChange({
        type: "TOGGLE",
        id,
        completed: updatedTodo.completed,
      });
    }
  };

  const handleDelete = async (id) => {
    const previousTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error("Ошибка удаления:", error);
        setTodos(previousTodos);
        saveToLocalStorage(previousTodos);
      }
    } else {
      addPendingChange({
        type: "DELETE",
        id,
      });
    }
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleDeleteCompleted = () => {
    if (!todos.some((todo) => todo.completed)) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];
    const completedTodos = originalTodos.filter((t) => t.completed);

    // Сразу удаляем локально
    const updatedTodos = originalTodos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      const failedIds = [];

      for (const todo of completedTodos) {
        try {
          await deleteTodo(todo.id);
        } catch (error) {
          console.error(`Ошибка удаления задачи ${todo.id}:`, error);
          failedIds.push(todo.id);
        }
      }

      // Если были ошибки, восстанавливаем неудаленные задачи
      if (failedIds.length > 0) {
        setTodos([
          ...updatedTodos,
          ...completedTodos.filter((t) => failedIds.includes(t.id)),
        ]);
        saveToLocalStorage([
          ...updatedTodos,
          ...completedTodos.filter((t) => failedIds.includes(t.id)),
        ]);
      }
    } else {
      // В оффлайн-режиме добавляем все удаления в очередь синхронизации
      completedTodos.forEach((todo) => {
        addPendingChange({
          type: "DELETE",
          id: todo.id,
        });
      });
    }

    setIsDeletingCompleted(false);
  };

  const onReorder = async (activeId, overId) => {
    if (!overId) return;

    const activeIndex = todos.findIndex((todo) => todo.id === activeId);
    const overIndex = todos.findIndex((todo) => todo.id === overId);

    if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex)
      return;

    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(activeIndex, 1);
    newTodos.splice(overIndex, 0, movedTodo);

    const updatedTodos = newTodos.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));

    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);

    if (isOnline) {
      try {
        await Promise.all(
          updatedTodos.map((todo) => updateTodo(todo.id, { order: todo.order }))
        );
      } catch (error) {
        console.error("Ошибка изменения порядка", error);
        // В случае ошибки возвращаем предыдущий порядок
        setTodos(todos);
        saveToLocalStorage(todos);

        // Добавляем изменения порядка в очередь синхронизации
        updatedTodos.forEach((todo) => {
          addPendingChange({
            type: "UPDATE",
            id: todo.id,
            data: { order: todo.order },
          });
        });
      }
    } else {
      // В оффлайн-режиме добавляем изменения порядка в очередь
      updatedTodos.forEach((todo) => {
        addPendingChange({
          type: "UPDATE",
          id: todo.id,
          data: { order: todo.order },
        });
      });
    }
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
