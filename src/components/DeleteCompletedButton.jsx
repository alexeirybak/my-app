const DeleteCompletedButton = ({ hasCompletedTodos, onClick }) => {
  if (!hasCompletedTodos) return null;

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
    >
      Удалить выполненные
    </button>
  );
};

export default DeleteCompletedButton;
