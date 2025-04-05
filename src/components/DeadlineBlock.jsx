const DeadlineBlock = ({
  showDeadlineInput,
  deadline,
  setDeadline,
  setShowDeadlineInput,
}) => {
  return (
    <>
      {showDeadlineInput && (
        <div className="flex items-center gap-2 text-gray-500  mt-2">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border border-blue-700 rounded flex-1"
          />
          <button
            type="button"
            onClick={() => {
              setDeadline("");
              setShowDeadlineInput(false);
            }}
            className="p-2 hover:text-gray-700 cursor-pointer"
          >
            Отмена
          </button>
        </div>
      )}
      {!showDeadlineInput && (
        <button
          type="button"
          onClick={() => {
            setShowDeadlineInput(true);
          }}
          className="self-start text-sm text-blue-500 hover:text-blue-700"
        >
          + Добавить дедлайн
        </button>
      )}
    </>
  );
};

export default DeadlineBlock;
