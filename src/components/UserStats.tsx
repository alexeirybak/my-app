import {
  useUserExperience,
  useUserLevel,
  useUserTasksCompleted,
} from "../store/useUserStore";

export const UserStats = () => {
  const experience = useUserExperience();
  const level = useUserLevel();
  const tasksCompleted = useUserTasksCompleted();
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
    </div>
  );
};
