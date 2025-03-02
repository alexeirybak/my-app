export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) =>
        task.completed ? (
          <li key={task.id} style={{ textDecoration: "line-through" }}>
            {task.text}
          </li>
        ) : (
          <li key={task.id}>{task.text}</li>
        )
      )}
    </ul>
  );
}
