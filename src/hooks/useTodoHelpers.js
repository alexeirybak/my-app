export const useTodoHelpers = () => {
  const sortedSavedTodos = (todos) => {
    return [...todos].sort((a, b) => a.order - b.order);
  };

  const createNewTodo = (text, deadline, order) => ({
    id: `temp_${Date.now()}`,
    text,
    completed: false,
    createdAt: new Date().toISOString(),
    deadline: deadline || null,
    order,
  });

  const updateTodoData = (todo, newText, newDeadline) => ({
    ...todo,
    text: newText,
    deadline: newDeadline,
  });

  const toggleTodoCompletion = (todo) => ({
    ...todo,
    completed: !todo.completed,
  });

  return {
    createNewTodo,
    sortedSavedTodos,
    updateTodoData,
    toggleTodoCompletion,
  };
};
