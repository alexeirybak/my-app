import {
  useUserExperience,
  useUserLevel,
  useUserTasksCompleted,
  useUserActions,
} from "../store/useUserStoreThird";

export const UserStats = () => {
  const experience = useUserExperience();
  const level = useUserLevel();
  const tasksCompleted = useUserTasksCompleted();
  const { canLevelUp, getExpForNextLevel } = useUserActions();

  const levelUpAvailable = canLevelUp();
  const expNeeded = getExpForNextLevel();
  const progressToNextLevel = 100 - expNeeded;

  return (
    <div className="container">
      <h3>Статистика пользователя</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Опыт</h3>
          <div className="value">{experience} XP</div>
        </div>
        <div className="stat-card">
          <h3>Уровень</h3>
          <div className="value">{level}</div>
        </div>
        <div className="stat-card">
          <h3>Заданий</h3>
          <div className="value">{tasksCompleted}</div>
        </div>
      </div>
      <div>
        <p>Прогресс до следующего уровня: {progressToNextLevel}%</p>
        <p>
          Осталось опыта до уровня {level + 1}: {expNeeded + 100} XP
        </p>
        <p>
          Повышение уровня {levelUpAvailable ? "доступно" : "недоступно"}
        </p>
      </div>
    </div>
  );
};
