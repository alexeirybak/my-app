import { useUserActions } from "../store/useUserStoreThird"; // Путь правильный?

export const UserActions = () => {
  const { levelUp, addExperience, resetUser } = useUserActions();
  
  // Добавьте console.log для проверки
  console.log('Функции:', { levelUp, addExperience, resetUser });

  return (
    <div className="container">
      <h3>Действия</h3>
      <div className="actions">
        <button className="primary" onClick={() => {
          console.log('Клик по levelUp');
          levelUp();
        }}>
          Повысить уровень
        </button>
        <button className="secondary" onClick={() => {
          console.log('Клик по addExperience 10');
          addExperience(10);
        }}>
          +10 опыта
        </button>
        <button className="secondary" onClick={() => {
          console.log('Клик по addExperience 50');
          addExperience(50);
        }}>
          +50 опыта
        </button>
        <button className="danger" onClick={() => {
          console.log('Клик по resetUser');
          resetUser();
        }}>
          Сбросить
        </button>
      </div>
    </div>
  );
};