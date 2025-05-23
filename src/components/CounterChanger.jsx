import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../state/counterSlice";

export default function CounterChanger() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const plusOne = () => {
    dispatch(increment());
  };

  const minusOne = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>Ну и еще счетчик {count}</h1>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
    </div>
  );
}
