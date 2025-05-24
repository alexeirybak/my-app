import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from "../state/counterSlice";
import { useState } from "react";

export default function Counter() {
  const [amount, setAmount] = useState(0);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const plusOne = () => {
    dispatch(increment());
  };

  const minusOne = () => {
    dispatch(decrement());
  };

  const plusMany = () => {
    dispatch(incrementByAmount(parseInt(amount)));
  };

  const minusMany = () => {
    dispatch(decrementByAmount(parseInt(amount)));
  };

  const handleChange = (e) => setAmount(e.target.value);

  return (
    <div>
      <h1>Счетчик {count}</h1>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
      <p>-------------------------</p>
      <input
        type="number"
        value={amount}
        onChange={handleChange}
        className="border-red-100"
      />
      <button onClick={plusMany}>+</button>
      <button onClick={minusMany}>-</button>
    </div>
  );
}
