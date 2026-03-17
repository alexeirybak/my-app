import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todoStore";
import type { Todo } from "../store/todoStore";

type Props = {
  todo: Todo;
};

const TodoItem = observer(({ todo }: Props) => {
  const { toggleTodo, removeTodo } = todoStore;
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => removeTodo(todo.id)}>&times;</button>
    </li>
  );
});

export default TodoItem;
