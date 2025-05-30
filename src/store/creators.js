import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  SET_LOADING,
  SET_ERROR,
} from "./types";

export const addTodoSuccess = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const toggleTodoSuccess = (todo) => ({
  type: TOGGLE_TODO,
  payload: todo,
});

export const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
