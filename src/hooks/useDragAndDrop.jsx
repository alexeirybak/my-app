import { useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ItemTypes = {
  TODO: "todo",
};

export function useDragAndDrop(reorderTodos) {
  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    drop: () => ({ name: "TodoList" }),
  });

  const moveTodo = useCallback(
    (dragIndex, hoverIndex) => {
      reorderTodos(dragIndex, hoverIndex);
    },
    [reorderTodos]
  );

  return { drop, moveTodo };
}

export function useTodoDrag(ref, id, index, moveTodo) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return { isDragging };
}

export function DragDropProvider({ children }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
