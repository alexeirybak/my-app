export default function todosReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "REORDER":
      return action.newOrder;
    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}
