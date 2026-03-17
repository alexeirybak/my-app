import { observer } from "mobx-react-lite";
import { todoStore } from "../store/todoStore";
import type { Todo } from "../store/todoStore";

type Props = {
  todo: Todo;
};

const TodoItem = observer(({ todo }: Props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => todoStore.toggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => todoStore.removeTodo(todo.id)}>&times;</button>
    </li>
  );
});

export default TodoItem;
