import { useState } from "react";

export function useCounter(initialValue, addedSum) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prevCount) => prevCount + addedSum);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - addedSum);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return [count, increment, decrement, reset];
}
