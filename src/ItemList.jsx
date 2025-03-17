import { useCallback, useState } from "react";
import { items } from "./helpers/array";
import { List } from "./List";

export function ItemList() {
  const [count, setCount] = useState(0);

  const handleItemClick = useCallback(
    (id) => {
      console.log(`Кликнут пункт №: ${id}`);
    },
    []
  );

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Отрендерить {count}</button>
      <List items={items} onItemClick={handleItemClick} />
    </>
  );
}
