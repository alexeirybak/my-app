import { useUIStore } from "../zustand/uiStore";

export default function Modal() {
  const { isModalOpen, closeModal } = useUIStore();

  if (!isModalOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>Информация о товаре</h3>

        <p>
          Это демонстрационное окно. Его состояние управляется через Zustand.
        </p>

        <button className="btn btn-primary" onClick={closeModal}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
