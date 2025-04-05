import { useState } from "react";
import Header from "./Header";
import { AddTodo } from "./AddTodo";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

const MainContent = ({
  onAdd,
  todos,
  handleUpdate,
  toggleComplete,
  setDeletingId,
}) => {
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });
  return (
    <div className="mx-auto flex flex-col gap-3">
      <Header />
      <AddTodo onAdd={onAdd} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        handleUpdate={handleUpdate}
        toggleComplete={toggleComplete}
        setDeletingId={setDeletingId}
      />
    </div>
  );
};

export default MainContent;
