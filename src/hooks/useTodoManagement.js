import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";
const API_URL = "https://67ed28164387d9117bbc7da1.mockapi.io/api/v1/todos";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );

      // Сортируем задачи по order
      const sortedSavedTodos = [...savedTodos].sort(
        (a, b) => a.order - b.order
      );
      setTodos(sortedSavedTodos);

      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const serverTodos = await response.json();
          // Сортируем и серверные задачи
          const sortedServerTodos = [...serverTodos].sort(
            (a, b) => a.order - b.order
          );
          setTodos(sortedServerTodos);
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(sortedServerTodos)
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadInitialData();
  }, []);

  const onAdd = async (text, deadline) => {
    // Берем максимальный order + 1, а не просто длину массива
    const maxOrder =
      todos.length > 0 ? Math.max(...todos.map((t) => t.order)) : 0;

    const newTodo = {
      id: `temp_${Date.now()}`,
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      deadline: deadline || null,
      order: maxOrder + 1, // Используем maxOrder вместо todos.length
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      const createdTodo = await response.json();

      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo
      );

      setTodos(syncedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos));
    } catch (error) {
      console.error("Ошибка добавления:", error);
      setTodos(todos);
    }
  };

  const handleUpdate = async (id, newText, newDeadline) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = {
      ...todoToUpdate,
      text: newText,
      deadline: newDeadline,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка обновления:", error);
      setTodos(todos);
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

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка обновления:", error);
      setTodos(todos);
    }
  };

  const handleDelete = async (id) => {
    // Создаем копию текущих задач
    const previousTodos = [...todos];

    try {
      // 1. Удаляем задачу локально
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      // 2. Обновляем порядок оставшихся задач
      const reorderedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }));

      // 3. Сначала обновляем состояние
      setTodos(reorderedTodos);

      // 4. Отправляем DELETE-запрос на сервер
      const deleteResponse = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!deleteResponse.ok) throw new Error("Delete failed");

      //5. Обновляем порядок на сервере для остальных задач
      await Promise.all(
        reorderedTodos.map((todo) =>
          fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: todo.order }),
          })
        )
      );

      // for (const todo of reorderedTodos) {
      //   try {
      //     await fetch(`${API_URL}/${todo.id}`, {
      //       method: "PUT",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ order: todo.order }),
      //     });
      //   } catch (error) {
      //     console.error(`Ошибка при обновлении задачи ${todo.id}:`, error);
      //     // Можно продолжить или прервать цикл
      //   }
      // }

      // 6. Сохраняем в localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reorderedTodos));
    } catch (error) {
      console.error("Ошибка удаления:", error);
      // Восстанавливаем предыдущее состояние при ошибке
      setTodos(previousTodos);
    }
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const handleDeleteCompleted = () => {
    if (!hasCompletedTodos) return;
    setIsDeletingCompleted(true);
  };

  const confirmDeleteCompleted = async () => {
    const originalTodos = [...todos];

    const completedIds = originalTodos
      .filter((t) => t.completed)
      .map((t) => t.id);

    // Создаем обновленный список ДО удаления
    const updatedTodos = originalTodos.filter((todo) => !todo.completed);

    // Обновляем порядок в оставшихся задачах
    const reorderedTodos = updatedTodos.map((todo, index) => ({
      ...todo,
      order: index + 1,
    }));

    setTodos(reorderedTodos);

    const failedIds = [];

    for (const id of completedIds) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      } catch (error) {
        console.error(`Ошибка удаления задачи ${id}:`, error);
        failedIds.push(id);
      }
    }

    if (failedIds.length > 0) {
      // Восстанавливаем только неудаленные задачи
      setTodos([
        ...reorderedTodos,
        ...originalTodos.filter(
          (todo) => todo.completed && failedIds.includes(todo.id)
        ),
      ]);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reorderedTodos));
    setIsDeletingCompleted(false);
  };

  const onReorder = async (activeId, overId) => {
    if (!overId) return;

    try {
      const activeIndex = todos.findIndex((todo) => todo.id === activeId);
      const overIndex = todos.findIndex((todo) => todo.id === overId);

      if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
        return;
      }

      const newTodos = [...todos];
      const [movedTodo] = newTodos.splice(activeIndex, 1);
      newTodos.splice(overIndex, 0, movedTodo);

      // Обновляем порядок ВСЕХ элементов, а не только перемещаемого
      const updatedTodos = newTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }));

      setTodos(updatedTodos);

      // Сохраняем только измененный порядок
      await Promise.all(
        updatedTodos.map((todo) =>
          fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: todo.order }),
          })
        )
      );

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Reorder error:", error);
      // Можно добавить восстановление предыдущего состояния при ошибке
      setTodos(todos);
    }
  };

  return {
    todos,
    setTodos,
    deletingId,
    setDeletingId,
    isDeletingCompleted,
    setIsDeletingCompleted,
    onAdd,
    handleUpdate,
    toggleComplete,
    handleDelete,
    handleDeleteCompleted,
    confirmDeleteCompleted,
    hasCompletedTodos,
    onReorder,
  };
};
