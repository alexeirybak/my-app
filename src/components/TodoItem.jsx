import { useEffect, useRef, useState, useCallback } from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import { useSortable } from "@dnd-kit/sortable";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: isDragging ? 1 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  const handleToggle = () => {
    onToggleComplete(todo.id);
  };

  const handleSave = useCallback(() => {
    if (editText.trim()) {
      onUpdate(todo.id, editText, editDeadline);
    }
    setIsEditing(false);
  }, [editText, editDeadline, todo.id, onUpdate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editFormRef.current && !editFormRef.current.contains(e.target)) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEditing, handleSave]);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="group flex items-center 
    justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex flex-row items-center gap-2">
        <div
          {...listeners}
          className="h-6 w-4 border-l-6 border-r-6 border-gray-300 border-dotted mx-0.5 cursor-grab active:cursor-grabbing"
        ></div>
        <div className="flex items-center gap-3">
          <CheckboxButton completed={todo.completed} onClick={handleToggle} />
          {isEditing ? (
            <TodoEditForm
              editText={editText}
              setEditText={setEditText}
              editDeadline={editDeadline}
              setEditDeadline={setEditDeadline}
              innerRef={editFormRef}
              onSave={handleSave}
            />
          ) : (
            <TodoTextDisplay todo={todo} setIsEditing={setIsEditing} />
          )}
        </div>
      </div>

      <DeleteButton onClick={() => onDelete(todo.id)} />
    </div>
  );
};
