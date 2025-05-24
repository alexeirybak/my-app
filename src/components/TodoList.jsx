import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleComplete, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
      ))}
    </ul>
  );
};

export default TodoList;
