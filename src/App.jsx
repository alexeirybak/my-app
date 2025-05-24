import { useState } from "react";
import TodoList from "./components/TodoList";
import InputTask from "./components/inputTask";
import { addTodo } from "./store/todoSlice";
import { useDispatch } from "react-redux";

function App() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleInput = (task) => setText(task);

  const addTask = () => {
    if (text.trim()) {
      dispatch(addTodo({ text }));
    }
    setText("");
  };

  return (
    <>
      <div className="text-2xl">
        <InputTask text={text} handleInput={handleInput} addTodo={addTask} />
      </div>
      <TodoList />
    </>
  );
}

export default App;
