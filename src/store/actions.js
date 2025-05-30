import { FETCH_TODOS, SET_LOADING, SET_ERROR } from "./types";

import {
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
  setLoading,
} from "./creators";

const API_URL = "https://67ed28164387d9117bbc7da1.mockapi.io/api/v1/todos";

export const fetchTodos = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
    const todos = await response.json();
    dispatch({ type: FETCH_TODOS, payload: todos });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch(setLoading(false));
  }
};

export const addTodo = (text) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);
    const todo = await response.json();
    dispatch(addTodoSuccess(todo));
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleTodo = (id) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    const { todos } = getState().todos;
    const todotoApdate = todos.find((todo) => todo.id === id);
    const newCompletedStatus = !todotoApdate.completed;
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: newCompletedStatus }),
    });

    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

    const updatedTodos = await response.json();
    dispatch(toggleTodoSuccess(updatedTodos));
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  } finally {
    dispatch(setLoading(false));
  }
};
