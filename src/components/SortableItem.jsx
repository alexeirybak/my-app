import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoItem } from './TodoItem';

export const SortableTodoItem = ({ todo, onDelete, onToggleComplete, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <TodoItem
        todo={todo}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        onUpdate={onUpdate}
        dragHandleProps={listeners}
      />
    </div>
  );
};
