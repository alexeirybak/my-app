import { TodoItem } from "../TodoItem/TodoItem";
import { TodoListContainer } from "./TodoList.styles";

export function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  return (
    <TodoListContainer>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </TodoListContainer>
  );
}