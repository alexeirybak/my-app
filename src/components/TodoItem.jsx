import { removeTodo, toggleTodoComplete } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  return (
    <li key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodoComplete({ id }))}
      />
      <span className={`${completed ? "line-through" : ""}`}>{text}</span>
      <button onClick={() => dispatch(removeTodo({ id }))}>Удалить</button>
    </li>
  );
};

export default TodoItem;
