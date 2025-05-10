import CheckedIcon from "./CheckedIcon";

const TodoEditForm = ({
  editText,
  setEditText,
  editDeadline,
  innerRef,
  setEditDeadline,
  onSave,
}) => {
  return (
    <div className="flex flex-col w-full gap-2 items-stretch" ref={innerRef}>
      <input
        type="text"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSave()}
        className="w-full px-2 py-1 border-2 border-blue-500 rounded text-sm text-gray-700 dark:text-gray-300"
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="datetime-local"
          value={editDeadline}
          onChange={(e) => setEditDeadline(e.target.value)}
          className="w-full sm:flex-1 px-2 py-1 border-2 border-blue-500 rounded text-sm text-gray-700 dark:text-gray-300"
        />
        <button
          onClick={onSave}
          className="flex items-center justify-center gap-1 px-2 py-1 sm:px-3 sm:py-1 text-green-600 hover:text-green-800 cursor-pointer bg-white border-2 border-green-500 rounded hover:bg-green-50 transition-color text-sm sm:text-base"
        >
          <CheckedIcon />
          <span className="sm:hidden">OK</span>
          <span className="hidden sm:inline">Готово</span>
        </button>
      </div>
    </div>
  );
};

export default TodoEditForm;
