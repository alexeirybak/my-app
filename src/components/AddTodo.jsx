import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/actions";

export default function AddTodo() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 px-4 border-1 border-green-500 mr-3 w-2/3"
      />
      <button
        type="submit"
        className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white cursor-pointer"
      >
        Добавить
      </button>
    </form>
  );
}
