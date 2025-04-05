import { TodoItem } from "./TodoItem";

const TodoList = ({ todos, handleUpdate, toggleComplete, setDeletingId }) => {
  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => setDeletingId(todo.id)}
          onToggleComplete={toggleComplete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;
