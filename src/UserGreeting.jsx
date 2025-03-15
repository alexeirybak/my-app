import { useRef, useEffect } from "react";

const UserGreeting = ({ name }) => {
  const previousName = useRef();

  useEffect(() => {
    if (previousName.current !== name) {
      console.log(`Имя изменилось с "${previousName.current}" на "${name}"`);
    }
    previousName.current = name; // Сохраняем текущее имя
  }, [name]); // Эффект срабатывает при изменении пропса name

  return (
    <div>
      <h1>Привет, {name}!</h1>
      {previousName.current && (
        <p>Ранее вы были известны как {previousName.current}</p>
      )}
    </div>
  );
};

export default UserGreeting;
