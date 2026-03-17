import { useState } from "react";
import { todoStore } from "../store/todoStore";

export default function TodoInput() {
  const [title, setTitle] = useState("");
  const { addTodo } = todoStore;

  const add = () => {
    const text = title.trim();
    if (!text) return;

    addTodo(text);
    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") add();
        }}
        placeholder="Новая задача"
      />
      <button onClick={add}>Добавить</button>
    </div>
  );
}
