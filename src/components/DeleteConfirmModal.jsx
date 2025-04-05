const DeleteConfirmModal = ({
  onCancel,
  onConfirm,
  message,
  deletingId,
  isDeletingCompleted,
}) => {
  const showModal = deletingId || isDeletingCompleted;
  if (!showModal) return null;
  return (
    <>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black/50 z-4 backdrop-blur-xs"></div>
        <div className="relative flex h-full items-center justify-center p-4 z-5">
          <div className="p-6 rounded-lg shadow-xl max-w-md w-full mx-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Подтверждение удаления</h3>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
