import { useState, useTransition } from "react";

export function BasicExample() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount((prev) => prev + 1);
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Увеличить счетчик</button>
      <span>{isPending ? "Загрузка..." : count}</span>
    </div>
  );
}
