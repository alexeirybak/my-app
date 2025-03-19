import { useCounter } from "./useCounter";

function App() {
  const [count, increment, decrement, reset] = useCounter(10, 5);

  return (
    <>
      <h1>Счетчик {count}</h1>
      <button onClick={increment}>Прибавить</button>
      <button onClick={decrement}>Убавить</button>
      <button onClick={reset}>Сбросить</button>
    </>
  );
}

export default App;
