import { useUserActions } from "../store/useUserStore";

export const UserActions = () => {
  const { levelUp, addExperience, resetUser } = useUserActions();
  return (
    <div className="container">
      <h3>Действия</h3>
      <div className="actions">
        <button className="primary" onClick={levelUp}>
          Повысить уровень
        </button>
        <button className="secondary" onClick={() => addExperience(10)}>
          +10 опыта
        </button>
        <button className="secondary" onClick={() => addExperience(50)}>
          +50 опыта
        </button>
        <button className="danger" onClick={resetUser}>
          Сбросить
        </button>
      </div>
    </div>
  );
};
