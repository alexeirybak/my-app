import { useSelector } from "react-redux";

export default function CounterUser() {
  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <h1>Еще счетчик {count}</h1>
    </div>
  );
}
