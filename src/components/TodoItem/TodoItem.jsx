import { useRef, useState, useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { useTodoDrag } from "../../hooks/useDragAndDrop";
import * as S from "./TodoItem.styles";

export function TodoItem({ todo, index, onToggle, onDelete, onUpdate }) {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const { reorderTodos } = useContext(TodoContext);
  const { isDragging } = useTodoDrag(ref, todo.id, index, reorderTodos);

  const handleEdit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <S.ListItem ref={ref} $isDragging={isDragging} $completed={todo.completed}>
      <S.Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        <S.EditInput
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <S.TodoText
          onDoubleClick={() => {
            setIsEditing(true);
            setEditText(todo.text);
          }}
          $completed={todo.completed}
        >
          {todo.text}
        </S.TodoText>
      )}

      <S.DeleteButton
        onClick={() => onDelete(todo.id)}
        aria-label="Удалить задачу"
      >
        ×
      </S.DeleteButton>
    </S.ListItem>
  );
}
