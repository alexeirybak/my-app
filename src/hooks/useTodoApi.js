import { API_URL } from "../constants/todos";

export const useTodoApi = () => {
  const fetchTodos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
  };

  const createTodo = async (todo) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
  };

  const updateTodo = async (id, todo) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return response;
  };

  return { fetchTodos, createTodo, updateTodo, deleteTodo };
};
