import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodo } from "../store/actions";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();


  return (
    <>
      <div>
        {todos.map((todo) => (
          <div key={todo.id} className="m-2 p-2 border-1 border-green-500">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id, !todo.completed))}
            />
            <span>{todo.text}</span>
            <button
              className="m-2 p-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
