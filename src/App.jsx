import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export function App() {
  return (
    <>
      <div className="max-w-[600px] p-5 m-auto my-0">
        <h1>Todo App с Redux Thunk</h1>
        <AddTodo />
        <TodoList />
      </div>
    </>
  );
}

export default App;
