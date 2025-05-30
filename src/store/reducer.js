import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  SET_LOADING,
  SET_ERROR,
} from "./types";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: action.payload };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_TODO:
      if (action.payload.text.includes("virus")) {
        throw new Error("Ты написал virus");
      }
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}
