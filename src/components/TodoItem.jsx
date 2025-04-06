import { useEffect, useRef, useState, useCallback } from "react";
import CheckboxButton from "./CheckboxButton";
import TodoEditForm from "./TodoEditForm";
import TodoTextDisplay from "./TodoTextDisplay";
import DeleteButton from "./DeleteButton";
import { useSortable, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const TodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");
  const editFormRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
      sensors: [
        {
          coordinateGetter: sortableKeyboardCoordinates,
          // Активируем сенсорные события
          activationConstraint: {
            delay: 150, // Задержка перед началом перетаскивания (для отличия от обычного клика)
            tolerance: 5, // Допустимое расстояние движения пальца до активации перетаскивания
          },
        },
      ],
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: transform ? 1 : "auto", // Добавляем z-index при перетаскивании
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
      style={style}
      {...attributes}
      className="touch-none select-none group flex items-center 
    justify-between pt-4 pb-4 pr-4 pl-2 gap-3 bg-white dark:bg-page-dark rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      {" "}
      <div
        className="h-6 w-4 border-l-6 border-r-6 border-gray-400 border-dotted mx-0.5 cursor-grab active:cursor-grabbing"
        {...listeners}
      ></div>
      <div className="flex items-center gap-3 flex-1">
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
      <DeleteButton onClick={() => onDelete(todo.id)} />
    </div>
  );
};
