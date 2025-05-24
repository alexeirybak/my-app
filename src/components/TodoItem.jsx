const TodoItem = ({ id, text, completed, toggleComplete, removeTodo }) => {
  return (
    <li key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleComplete(id)}
      />
      <span className={`${completed ? "line-through" : ""}`}>{text}</span>
      <button onClick={() => removeTodo(id)}>Удалить</button>
    </li>
  );
};

export default TodoItem;
