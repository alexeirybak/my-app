import { useRef, useEffect, useState } from "react";

const NumberTracker = () => {
  const [number, setNumber] = useState(0);
  const previousNumber = useRef();

  useEffect(() => {
    previousNumber.current = number; // Сохраняем текущее значение в ref
  }, [number]); // Эффект срабатывает при изменении number

  return (
    <div>
      <h2>Текущее число: {number}</h2>
      <h2>Предыдущее число: {previousNumber.current}</h2>
      <button onClick={() => setNumber(number + 1)}>Увеличить число</button>
      <button onClick={() => setNumber(number - 1)}>Уменьшить число</button>
    </div>
  );
};

export default NumberTracker;
