import { useState, useCallback, useEffect } from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(1);

  const memoizedCallback = useCallback(() => {
    console.log("Функция memoizedCallback вызвана, count:", count);
  }, [count]); 

  useEffect(() => {
    console.log("useEffect сработал");
    memoizedCallback();
  }, [memoizedCallback]); 

  return (
    <div>
      <h1>Родительский компонент</h1>
      <p>Текущее значение count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить count</button>
      <ChildComponent onAction={memoizedCallback} />
      <p>Другое состояние: {otherState}</p>
      <button onClick={() => setOtherState(otherState + 1)}>
        Изменить другое состояние
      </button>
    </div>
  );
}

export default ParentComponent;
